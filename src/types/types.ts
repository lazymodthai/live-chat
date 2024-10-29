export enum MessageType {
    TEXT = 'TEXT',
    IMAGE = 'IMAGE',
    FILE = 'FILE',
    SYSTEM = 'SYSTEM'
}

export enum MessageStatus {
    SENDING = 'SENDING',
    SENT = 'SENT',
    DELIVERED = 'DELIVERED',
    READ = 'READ',
    FAILED = 'FAILED'
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