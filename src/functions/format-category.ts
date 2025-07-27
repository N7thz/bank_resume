import { Category } from "@prisma/client"
import { categories } from "@/utils/categories"

export function formatCategories(category: Category) {
    return categories.find((item) => item.value === category)!
}