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
npm test
npm run build
# эсвэл бүгдийг:
npm run check
```

Static production файлууд `out/` хавтаст үүснэ. Энэ хавтас Git-д орохгүй.

## Netlify deployment

Repository-г Netlify-д холбоход root дахь `netlify.toml` автоматаар дараах тохиргоог ашиглана:

- Build command: `npm run build`
- Publish directory: `out`
- Node.js: `20.19.5`

Netlify Dashboard → **Add new site** → **Import an existing project** хэсгээс GitHub repository-г сонгоод Deploy дарна. Build болон publish утгуудыг гараар өөрчлөх шаардлагагүй.

Site configuration → **Environment variables** хэсэгт `.env.example` дэх Firebase утгуудыг нэмнэ. Custom domain ашиглах бол `NEXT_PUBLIC_SITE_URL`-ийг тухайн production domain-оор тохируулна. Netlify-ийн өгсөн `*.netlify.app` domain ашиглаж байгаа бөгөөд энэ утгыг оруулаагүй үед build-ийн `URL` автоматаар хэрэглэгдэнэ.

Firebase ашиглах бол Firebase Console → Authentication → Settings → Authorized domains хэсэгт Netlify domain-оо нэмнэ. Мөн API key-ийн HTTP referrer restriction-д production болон deploy-preview domain-уудаа зөвшөөрнө.

Deploy preview бүр өөр URL-тай байдаг тул Firebase шаардлагагүй catalog preview хэвийн ажиллана. Firebase-тэй preview тестлэх бол зөвхөн итгэлтэй preview domain-оо Firebase Authorized domains-д нэмнэ.

Локал орчинд Netlify-тэй ижил production output шалгах:

```bash
npm ci
npm run check
npx serve out
```

## Бусад deployment

Vercel, Firebase Hosting, Cloudflare Pages эсвэл бусад static hosting-д байршуулж болно. Build command: `npm run build`, output directory: `out`.

Firestore ашиглах бол энэ repository-д байгаа rules-ийг Firebase project руу deploy хийнэ:

```bash
npx firebase-tools login
npx firebase-tools deploy --only firestore:rules --project YOUR_FIREBASE_PROJECT_ID
```

Rules нь бүтээгдэхүүнийг public уншихыг зөвшөөрөх боловч browser-оос засахыг хориглоно. Захиалгыг зөвхөн хязгаарласан schema-гаар үүсгэх боломжтой бөгөөд public унших, засах, устгах эрхгүй. Firebase Console эсвэл Admin SDK-ээр харагдах захиалгын үнэ client-ээс ирдэг тул төлбөрийг баталгаажуулахдаа бүтээгдэхүүний албан ёсны үнэтэй тулгана.

Production-д оруулахын өмнө:

- Firebase-ийн API key domain restriction болон App Check enforcement-ийг Console дээр идэвхжүүлэх
- `firestore.rules`-ийг production Firebase project руу deploy хийх
- Messenger захиалга хүлээн авах page username болон банкны мэдээллийг баталгаажуулах
- `.env.local`-ийг commit хийхгүй байх
- `npm run check` амжилттай дууссаны дараа commit хийх
