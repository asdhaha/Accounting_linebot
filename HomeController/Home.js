document.addEventListener('DOMContentLoaded', function () {
    getMoney();
});


function updateMoney() {
    console.log("updateMoney");
    const status = document.getElementById('status').value;
    const amount = document.getElementById('amount').value;
    const apiUrl = 'http://localhost:3000/updateNumber/' + status + '/' + amount;
    console.log("url", apiUrl);
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    getMoney();
}

function getMoney() {
    console.log("getMoney");
    const apiUrl = 'http://localhost:3000/getNumber';
    const depositSpan = document.getElementById('deposit');


    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data && data.number !== undefined) {
                depositSpan.textContent = `$${data.number}`;
            } else {
                depositSpan.textContent = '找不到你的 $$';
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            depositSpan.textContent = '找不到你的 $$';
        });
}
