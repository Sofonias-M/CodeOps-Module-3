import { NextResponse, NextRequest } from 'next/server';
import { products } from '@/data/products';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  
  if (category && category !== 'All') {
    const filtered = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    return NextResponse.json(filtered);
  }
  
  return NextResponse.json(products);
}