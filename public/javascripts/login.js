// login.js
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // 防止表单提交默认行为

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // 发送请求到后端进行验证
    fetch('http://49.232.148.121:3001/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })    
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('登录成功！');
            // 可以重定向到另一个页面
            window.location.href = '/index.html'; // 登录成功后跳转页面
        } else {
            alert('用户名或密码错误！');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
