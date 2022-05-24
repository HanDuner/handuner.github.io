<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<body>
<h2>Hello World!</h2>
<div>
    请求域中的用户名：<%=request.getAttribute("login_user")%>
</div>

<div>
    会话域中的用户名：<%=session.getAttribute("session_login_user")%>
</div>

<div>
    <a href="test.jsp">跳转测试页面</a>
</div>

</body>
</html>
