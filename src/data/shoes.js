const photos = [
  '1549298916-b41d501d3772', '1542291026-7eec264c27ff',
  '1600185365926-3a2ce3cdb9eb', '1600269452121-4f2416e55c28',
  '1600185365483-26d7a4cc7519', '1491553895911-0055eca6402d',
  '1525966222134-fcfa99b8ae77', '1539185441755-769473a23570',
];
const descriptions = {
  men: ['Clean lines, thoughtful details, and all-day comfort. A cushioned footbed and durable, flexible sole make this pair an effortless everyday essential.', 'Des lignes épurées, des détails soignés et un confort durable. Une semelle intérieure rembourrée et une base souple et résistante pour vous accompagner au quotidien.', 'خطوط أنيقة وتفاصيل متقنة وراحة طوال اليوم. نعل داخلي مبطن وقاعدة مرنة ومتينة تجعل هذا الحذاء قطعة أساسية لإطلالتك اليومية.'],
  women: ['A beautifully simple silhouette with a soft lining and supportive cushioning. Light on your feet and easy to style, wherever the day takes you.', 'Une silhouette élégante et simple, une doublure douce et un amorti confortable. Légères et faciles à porter, où que la journée vous mène.', 'تصميم بسيط وأنيق مع بطانة ناعمة ووسادة داعمة. خفيف على قدميك وسهل التنسيق أينما يأخذك يومك.'],
  kids: ['Light, flexible, and ready for adventure. A soft collar, comfortable cushioning, and a durable sole support growing feet from the classroom to the playground.', 'Légères, souples et prêtes pour l’aventure. Un col doux, un amorti confortable et une semelle résistante accompagnent les petits pieds de l’école à la récréation.', 'خفيف ومرن وجاهز للمغامرة. حافة ناعمة ووسادة مريحة ونعل متين تدعم الأقدام الصغيرة من الفصل إلى ساحة اللعب.'],
};
// ID, category, names (EN/FR/AR), price, original price, photo, available colors.
const rows = [
  ['m-001','men','Everyday Court','Court au quotidien','كورت اليومي',89,null,0,['white','black']],
  ['m-002','men','Urban Runner','Runner urbain','عدّاء المدينة',109,139,1,['black','red','white']],
  ['m-003','men','Essential Low','Essential basse','إسنشال لو',79,null,6,['white','gray']],
  ['m-004','men','Studio Leather','Studio cuir','ستوديو الجلدي',129,null,2,['black','white']],
  ['m-005','men','Heritage 22','Héritage 22','هيريتج 22',99,129,3,['gray','white','black']],
  ['m-006','men','Motion Knit','Motion maille','موشن المحبوك',115,null,4,['black','gray']],
  ['m-007','men','Weekend Canvas','Canvas du week-end','كانفاس العطلة',59,79,6,['white','black','red']],
  ['m-008','men','Track Form','Track Form','تراك فورم',139,null,7,['gray','black']],
  ['w-001','women','Cloud Step','Pas léger','كلاود ستيب',99,null,5,['white','gray']],
  ['w-002','women','City Platform','Plateforme urbaine','سيتي بلاتفورم',89,119,2,['white','black']],
  ['w-003','women','Minimal Court','Court minimaliste','مينيمال كورت',95,null,3,['white','red']],
  ['w-004','women','Flow Runner','Runner Flow','فلو رانر',119,null,1,['red','black','white']],
  ['w-005','women','Sunday Slip','Sunday sans lacets','صنداي سليب',69,89,6,['black','gray','white']],
  ['w-006','women','Mono Studio','Studio monochrome','مونو ستوديو',125,null,4,['black','white']],
  ['w-007','women','Retro Ease','Rétro confort','ريترو إيزي',79,109,7,['gray','white','red']],
  ['w-008','women','Daily Form','Forme quotidienne','ديلي فورم',109,null,0,['white','black','gray']],
  ['k-001','kids','Little Explorer','Petit explorateur','المستكشف الصغير',49,null,0,['white','gray']],
  ['k-002','kids','Mini Runner','Mini runner','ميني رانر',39,55,1,['red','black']],
  ['k-003','kids','Playground Court','Court récréation','كورت المرح',55,null,3,['white','black','red']],
  ['k-004','kids','Tiny Classic','Petit classique','تايني كلاسيك',45,null,6,['white','black']],
  ['k-005','kids','Junior Motion','Motion junior','جونيور موشن',45,65,7,['gray','red','black']],
  ['k-006','kids','School Day','Jour d’école','يوم المدرسة',59,null,4,['black','white']],
  ['k-007','kids','Adventure Low','Aventure basse','أدفنتشر لو',35,49,2,['white','gray','black']],
  ['k-008','kids','First Steps 22','Premiers pas 22','أولى الخطوات 22',49,null,3,['white','red']],
];
export const sampleShoes = rows.map(([id,category,name,nameFr,nameAr,price,originalPrice,photo,colors], index) => {
  const image = `https://images.unsplash.com/photo-${photos[photo]}?auto=format&fit=crop&w=900&q=85`;
  return { id,category,name,price,originalPrice,colors,image,images:[image,image.replace('w=900','w=1200')],
    description:descriptions[category][0],
    translations:{fr:{name:nameFr,description:descriptions[category][1]},ar:{name:nameAr,description:descriptions[category][2]}},
    sizes:category==='kids'?['26','27','28','29','30','31','32','33','34','35']:['36','37','38','39','40','41','42','43','44','45'],
    stock:18+(index%8)*3,createdAt:new Date(Date.UTC(2026,9,28-index)).toISOString() };
});
export default sampleShoes;
