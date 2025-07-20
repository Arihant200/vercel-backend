import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true })
  content: string;

  @Prop()
  imageUrl?: string;

  @Prop({ type: String, ref: 'User', required: true })
authorId: string;

  @Prop({ type: [String], default: [] })  
  likedBy: string[];  
}

export const PostSchema = SchemaFactory.createForClass(Post);
