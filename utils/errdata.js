//结果提示
const errdata = {
	errlist(err,errlogo){
		uni.showToast({
			title:err,//这里可以动态传入提示信息
			duration:3000,
			icon:errlogo//这里可以传一个动态的图标数值
		})
	}
}


export{
	errdata
}