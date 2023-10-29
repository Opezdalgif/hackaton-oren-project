<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Запуск проекта с использованием PM2

1. **Установите Node.js:**

   Установите Node.js на вашем сервере. Вы можете скачать установщик Node.js с [официального сайта Node.js](https://nodejs.org/) и следовать инструкциям по установке.

2. **Установите PM2 глобально:**

   Установите PM2 глобально на вашем сервере, используя npm (менеджер пакетов Node.js):

   ```bash
   npm install -g pm2

3. **Клонируйте проект**

   Клонируйте проект NestJS на сервер:

   ```bash
   git clone https://github.com/проект.git

4. **Перейдите в папку проекта:**

   ```bash
   cd путь/к/проекту

5. **Установите зависимости:**

   Установите все зависимости проекта, выполнив команду:

   ```bash
   npm install

6. **Запустите проект с PM2:**
   
   ```bash
   pm2 start npm --name "Name Api" -- run "start"