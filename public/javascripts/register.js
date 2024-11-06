// register.js
document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止表单的默认提交行为

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmpassword').value;

    // 检查密码是否匹配
    if (password !== confirmPassword) {
        alert('两次密码输入不一致！');
        return;
    }

    // 发送注册请求到后端
    fetch('http://49.232.148.121:3001/api/RegisUser/register', { // 使用您服务器的地址
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('注册成功！');
            window.location.href = '/login.html'; // 跳转到登录页面
        } else {
            alert(data.message || '注册失败！');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
