export enum MessageType {
    TEXT = 'text',
    IMAGE = 'image',
    FILE = 'file',
    SYSTEM = 'system'
}

export enum MessageStatus {
    SENDING = 'sending',
    SENT = 'sent',
    DELIVERED = 'delivered',
    READ = 'read',
    FAILED = 'failed'
}

export interface IMessage {
    messageId: string;
    conversationId: string;
    senderId: string;
    messageType: MessageType;
    messageContent: string;
    status: MessageStatus;
    replyToMessageId?: string;
    metadata?: {
        clientMessageId?: string;
        editHistory?: Array<{
            content: string;
            editedAt: Date;
        }>;
        customData?: any;
    };
    isEdited: boolean;
    isDeleted: boolean;
    isPinned: boolean;
    sentAt: Date;
    deliveredAt?: Date;
    readAt?: Date;
    editedAt?: Date;
    deletedAt?: Date;
    reactions_count?: number;
    current_user_reaction?: string;
    attachment_count?: number;
}