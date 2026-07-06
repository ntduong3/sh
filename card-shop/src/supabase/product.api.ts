import { supabase } from "./supabase";
import type { Product } from "../models/Product";

type ProductInsert = Omit<Product, 'id' | 'created_at'>;

class ProductApi{
    private readonly tableName = import.meta.env.VITE_PRODUCTS_TABLE ?? 'product';

    private formatError(error: unknown) {
        if (error && typeof error === 'object') {
            const typedError = error as {
                message?: string;
                code?: string;
                details?: string;
                hint?: string;
            };

            return [
                typedError.code ? `Code: ${typedError.code}` : null,
                typedError.message ? `Message: ${typedError.message}` : null,
                typedError.details ? `Details: ${typedError.details}` : null,
                typedError.hint ? `Hint: ${typedError.hint}` : null,
            ]
                .filter(Boolean)
                .join(' | ');
        }

        return 'Unknown Supabase error';
    }

    async checkConnection(): Promise<void> {
        const { error } = await supabase
            .from(this.tableName)
            .select('id')
            .limit(1);

        if (error) {
            throw new Error(this.formatError(error));
        }
    }

    async findAll(): Promise<Product[]>{
        const { data, error } = await supabase
            .from(this.tableName)
            .select("*");
        if (error) {
            throw new Error(this.formatError(error));
        }

        return (data ?? []) as Product[];

    }

    async findById(id:number): Promise<Product | null>{
        const { data, error } = await supabase
            .from(this.tableName)
            .select("*")
            .eq("id",id)
            .single();

        if (error) {
            throw new Error(this.formatError(error));
        }

        return (data ?? null) as Product | null;

    }

    async insert(product: ProductInsert){

        return await supabase
            .from(this.tableName)
            .insert(product);

    }

    async update(product:Product){

        return await supabase
            .from(this.tableName)
            .update(product)
            .eq("id",product.id);

    }

    async delete(id:number){

        return await supabase
            .from(this.tableName)
            .delete()
            .eq("id",id);

    }

}

export default new ProductApi();
