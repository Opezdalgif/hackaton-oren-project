export enum EChatGatewayEvents {
    ClientConnected = 'client_connected',
    ClientDisconnected = 'client_disconnected',
    SendMessage = 'send_message',
    ReceivedMessage = 'received_message',
    ErrorFilter = 'error_filter',
    SuccessSend = 'success_send',
    
    CreateChat = 'create_chat',
    GetSelfChats = 'get_self_chat',
    ReturnSelfChats = 'return_self_chat',
    UpdateSelfChats = 'update_self_chat',

    ReadMessage='read_message',

    GetSelNotifications = 'get_self_notifications',
    ReturnSelfNotifications= 'return_self_notifications'
}
