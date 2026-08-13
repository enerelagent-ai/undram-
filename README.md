# Undram Honey

Undram Honey брэндийн олон хэлтэй, responsive storefront. Next.js App Router ашиглан static export үүсгэдэг бөгөөд бүтээгдэхүүний үндсэн каталог кодод агуулагдана. Firebase тохируулсан үед бүтээгдэхүүн болон захиалгыг Firestore-той синк хийнэ.

## Шаардлага

- Node.js 20.9+
- npm 10+

## Ажиллуулах

```bash
npm ci
cp .env.example .env.local
npm run dev
```

`http://localhost:3000` хаягаар нээнэ. Firebase ашиглахгүй бол env утгуудыг хоосон үлдээж болно; static каталог болон Messenger checkout хэвийн ажиллана.

## Environment variables

`.env.example`-ийг `.env.local` болгон хуулж Firebase Web App-ийн public config утгуудыг оруулна. `NEXT_PUBLIC_*` утгууд browser bundle-д харагддаг тул нууц түлхүүр бүү хадгал. Firestore Security Rules болон App Check-ийг Firebase Console дээр заавал тохируулна.

## Шалгалт

```bash
npm run lint
npm run typecheck
npm run build
# эсвэл бүгдийг:
npm run check
```

Static production файлууд `out/` хавтаст үүснэ. Энэ хавтас Git-д орохгүй.

## Deployment

Vercel, Firebase Hosting, Cloudflare Pages эсвэл бусад static hosting-д байршуулж болно. Build command: `npm run build`, output directory: `out`.

Production-д оруулахын өмнө:

- Firebase-ийн домэйн restriction, Firestore Rules, App Check-ийг идэвхжүүлэх
- Messenger захиалга хүлээн авах page username болон банкны мэдээллийг баталгаажуулах
- `.env.local`-ийг commit хийхгүй байх
- `npm run check` амжилттай дууссаны дараа commit хийх
