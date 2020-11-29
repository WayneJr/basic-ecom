import mongoose, { Document, Model, Schema } from 'mongoose';
// @ts-ignore
import slug from 'mongoose-slug-generator';
mongoose.plugin(slug);

const productSchema: Schema = new Schema<any>({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Please enter a name'],
        unique: [true, 'name already in use'],
        trim: true
    },
    slug: {
        type: String,
        slug: 'name'
    },
    description: {
        type: String,
        required: [true, "Please add a description"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Please add a price"],
        trim: true
    },
    availableStock: {
        type: Number,
        required: [true, "Please enter number of available stock"],
        trim: true
    },
    image: {
        type: String,
        required: [true, "Please add an image"],
        // unique: [true, "name already in use"],
        trim: true
    },
},
    {
        timestamps: true
    })

export const Product:Model<Document> = mongoose.model('Product', productSchema);
