export interface IProduct {
    id: string
    name: string
    price: number
    description: string
}

export const products: IProduct[] = [
    {
        id: '1',
        name: 'Phone XL',
        price: 99,
        description: 'A large phone with one of the best screens',
    },
    {
        id: '2',
        name: 'Phone Mini',
        price: 199,
        description: 'A phone with vivid colors for a compact phone',
    },
    {
        id: '3',
        name: 'Phone Pro',
        price: 299,
        description: 'A great phone with one of the best cameras',
    },
]
