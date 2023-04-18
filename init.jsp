<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
	href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js"></script>
<script
	src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="bht.js" type="text/javascript" defer="defer"></script>


<title>宝户通</title>
</head>
<script type="text/javascript">
	$(document).ready(function() {
		$("#R01").formInit();
	});
</script>
<body>
	<div class="container">
		<form class="form-horizontal" name="R01" id="R01" method="post" action="">
			<div class="fieldInfo"></div>
			<div class="form-group class-splitInfo sr-only" id="class-splitInfo"></div>
			<div class="text-center">
				<button type="reset" class="btn btn-info">重置</button>
				<button type="submit" class="btn btn-info">提交</button>
			</div>
		</form>
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="selectFucModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		                <h4 class="modal-title" id="myModalLabel">选择需打开的功能</h4>
		            </div>
		            <div class="modal-body">
						<select name="selectFuc" id="selectFuc" class="form-control">
						</select>
					</div>
		            <div class="modal-footer">
		                <button type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
		            </div>
		        </div><!-- /.modal-content -->
		    </div><!-- /.modal -->
		</div>
	</div>
</body>
</html>
