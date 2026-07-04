import { supabase } from "./supabase";
import type { Product } from "../models/Product";

class ProductApi{

    async findAll(){

        return await supabase
            .from("products")
            .select("*")
            .order("id");

    }

    async findById(id:number){

        return await supabase
            .from("products")
            .select("*")
            .eq("id",id)
            .single();

    }

    async insert(product:Product){

        return await supabase
            .from("products")
            .insert(product);

    }

    async update(product:Product){

        return await supabase
            .from("products")
            .update(product)
            .eq("id",product.id);

    }

    async delete(id:number){

        return await supabase
            .from("products")
            .delete()
            .eq("id",id);

    }

}

export default new ProductApi();