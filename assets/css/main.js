async function fetchNews(){
  const sheetURL = 'YOUR_GOOGLE_SHEET_CSV_URL';
  try{
    const res = await fetch(sheetURL);
    const csv = await res.text();
    const rows = csv.trim().split('\n').slice(1);
    const newsData = rows.map(r=>{const [date,title,excerpt,link]=r.split(','); return {date,title,excerpt,link};});
    populateNews(newsData);
  } catch(e){ console.error(e); }
}
function populateNews(newsData){
  const container=document.getElementById('latestList');
  if(!container) return;
  container.innerHTML='';
  newsData.forEach(it=>{
    const card=document.createElement('div');
    card.className='card';
    card.innerHTML=`<h4>${it.title}</h4><small>${it.date}</small><p>${it.excerpt}</p><a class="btn btn-outline" href="${it.link}">Read</a>`;
    container.appendChild(card);
  });
}
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('#year').forEach(el=>el.textContent=new Date().getFullYear());
  fetchNews();
});
