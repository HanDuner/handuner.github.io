<%--
  Created by IntelliJ IDEA.
  User: lintao
  Date: 2022/5/16
  Time: 14:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<h2>Hello Test World2!</h2>
<div>
    请求域中的用户名：<%=request.getAttribute("login_user")%>

</div>
<div>
    会话域中的用户名：<%=session.getAttribute("session_login_user")%>
</div>

<%--  page < request  < session  < application  --%>
</body>
</html>
