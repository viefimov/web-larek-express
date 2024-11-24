import mongoose, { Schema, Document } from 'mongoose';

interface IProduct extends Document {
  title: string;
  image: {
    fileName: string;
    originalName: string;
  };
  category: string;
  description?: string;
  price?: number;
}

const ProductSchema: Schema = new Schema<IProduct>({
  title: {
    type: String,
    required: [true, 'Поле "title" должно быть заполнено'],
    unique: true,
    minlength: [2, 'Минимальная длина поля "title" - 2 символа'],
    maxlength: [30, 'Максимальная длина поля "title" - 30 символов'],
  },
  image: {
    fileName: {
      type: String,
      required: [true, 'Поле "fileName" для изображения обязательно'],
    },
    originalName: {
      type: String,
      required: [true, 'Поле "originalName" для изображения обязательно'],
    },
  },
  category: {
    type: String,
    required: [true, 'Поле "category" должно быть заполнено'],
  },
  description: {
    type: String,
    default: null,
  },
  price: {
    type: Number,
    default: null,
    min: [0, 'Цена товара не может быть отрицательной'],
  },
});

const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
