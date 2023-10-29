import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { existsSync, writeFileSync, mkdirSync } from 'fs';
import * as mime from 'mime-types';
import * as uuid from 'uuid';
import { join } from 'path';
import {
    FileErrorUploadException,
    FileIncorrectFormatException,
} from './exceptions';

@Injectable()
export class FilesService {
    private readonly logger: Logger = new Logger('Files-Service');
    protected locallyDirectory: string;
    protected publicDirectory: string;

    private readonly extensions = {
        photo: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
        audio: ['wav', 'mp3'],
        video: ['mp4'], 
        document: ['doc', 'docx' , 'ppt', 'pptx', 'xls', 'xlsx'],
        //document: ['vnd.openxmlformats-officedocument.wordprocessingml.document', 'pdf', 'vnd.ms-excel','vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'vnd.openxmlformats-officedocument.presentationml.presentation','pptm','vnd.ms-powerpoint', 'msword'],
    };

    constructor(private readonly configService: ConfigService) {
        this.publicDirectory = configService.getOrThrow('PUBLIC_DIRECTORY');

        this.locallyDirectory = join(require.main.path, this.publicDirectory);

        if (!existsSync(this.locallyDirectory)) {
            mkdirSync(this.locallyDirectory, { recursive: true });
        }
    }

    switchCaseType(extension: string) {
        switch(extension) {
            case 'vnd.openxmlformats-officedocument.wordprocessingml.document':
                return 'docx'
            case 'vnd.ms-excel':
                return 'xls'
            case 'vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                return 'xlsx'
            case 'vnd.openxmlformats-officedocument.presentationml.presentatio':
                return 'pptx'   
            case 'vnd.ms-powerpoint': 
                return 'ppt'
            case 'msword':
                return 'doc'
        }
    }

    uploadFileBase64(encodedFile: string, isDocument?: boolean, nameFile?: string,...allowedTypes: string[]) {
        const data = encodedFile.split(';base64,');
        let extension = data[0].split('/').pop();
        if(this.switchCaseType(extension)) {
            extension =  this.switchCaseType(extension)
        }

        const fileType = this.verifyFileExtension(extension);

        if (!allowedTypes.includes(fileType)) {
            throw new FileIncorrectFormatException();
        }

        let buffer: Buffer;
        try {
            buffer = Buffer.from(data[1], 'base64');
        } catch (e) {
            this.logger.error(e);
            throw new FileIncorrectFormatException();
        }
    
        let fileName: string
        if(!isDocument) {
            fileName = this.generateName(extension);
        } else {
            fileName = nameFile
        }
        const publicPath: string = join(this.publicDirectory, fileName);
        const locallyPath: string = join(this.locallyDirectory, fileName);

        try {
            writeFileSync(locallyPath, buffer, { encoding: 'base64' });
        } catch (e) {
            this.logger.error(e);
            throw new FileErrorUploadException();
        }

        return { publicPath, locallyPath, fileType };
    }

    async upload(file: Express.Multer.File) {
        const fileName: string = this.generateNameForFile(file);
        const fileType: string = this.getTypeByExtension(file);
        const publicPath: string = join(this.publicDirectory, fileName);
        const locallyPath: string = join(this.locallyDirectory, fileName);

        try {
            writeFileSync(locallyPath, file.buffer);
        } catch (e) {
            this.logger.error(e);
            throw new FileErrorUploadException();
        }

        return { publicPath, locallyPath, fileType };
    }

    generateNameForFile(file: Express.Multer.File) {
        return this.generateName(mime.extension(file.mimetype));
    }

    generateName(extension) {
        return `${uuid.v4()}.${extension}`;
    }

    getTypeByExtension(file: Express.Multer.File) {
        const extension = mime.extension(file.mimetype);
        return this.verifyFileExtension(extension);
    }

    verifyFileExtension(extension: string | false) {
        console.log(extension)
        for (let type in this.extensions) {
            if (this.extensions[type].includes(extension)) {
                return type;
            }
        }

        throw new FileIncorrectFormatException();
    }
}