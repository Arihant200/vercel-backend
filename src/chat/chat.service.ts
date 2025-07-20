import { Injectable ,BadRequestException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './schemas/message.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

 // ChatService
async sendMessage(senderId: string, receiverId: string, messageText: string) { // Renamed parameter for clarity
  if (!senderId || !receiverId || !messageText) {
    throw new BadRequestException('Missing fields');
  }

  const chat = new this.messageModel({
    senderId,
    receiverId,
    content: messageText, // <--- Pass it as 'content'
    createdAt: new Date(),
  });

  return await chat.save();
}


  async getMessagesBetweenUsers(userId1: string, userId2: string): Promise<Message[]> {
    return this.messageModel.find({
      $or: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 },
      ],
    }).sort({ createdAt: 1 }); // sort oldest → newest
  }
  
}
