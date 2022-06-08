function strIsNull(str) {
	if (str ==null || str.replace(/\ +/g, "") == '') {
		return  true;
	}else{
		return false;
	}
}
export default strIsNull

