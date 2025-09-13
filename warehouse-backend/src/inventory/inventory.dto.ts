export class CreateInventoryDto {
    productId: number;
    quantity: number;
    type: 'Import' | 'Export';
    reason?: string;
}