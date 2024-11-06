// forget.js
document.getElementById('forget-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const newPassword = document.getElementById('newpassword').value;
    const confirmPassword = document.getElementById('confirmpassword').value;

    // 检查新密码和确认密码是否匹配
    if (newPassword !== confirmPassword) {
        alert('两次输入的密码不一致！');
        return;
    }

    // 向后端发送请求进行密码重置
    fetch('http://49.232.148.121:3001/api/resetPassword/reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, newPassword }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'user_not_found') {
            if (confirm('该用户不存在，请注册！')) {
                window.location.href = 'register.html'; // 跳转到注册页面
            }
        } else if (data.status === 'same_password') {
            if (confirm('不可输入旧密码，是否返回登陆？')) {
                window.location.href = 'login.html'; // 跳转到登录页面
            }
        } else if (data.status === 'success') {
            alert('重置密码成功！');
            window.location.href = '/login.html'; // 跳转到登录页面
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
