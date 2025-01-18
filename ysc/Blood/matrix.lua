local module = {}
function module.m2x2(matrix)
	return matrix[1][1]*matrix[2][2]-matrix[2][1]*matrix[1][2]
end
function module.m3x3(matrix)
	local one = matrix[1][1]*module.m2x2({
		{matrix[2][2],matrix[2][3]},
		{matrix[3][2],matrix[3][3]}
	})
	local two = -matrix[1][2]*module.m2x2({
		{matrix[2][1],matrix[2][3]},
		{matrix[3][1],matrix[3][3]}
	})
	local three = matrix[1][3]*module.m2x2({
		{matrix[2][1],matrix[2][2]},
		{matrix[3][1],matrix[3][2]}
	})
	--print(one,two,three)
	return one + two+three
end
function module.m4x4(matrix)
	local one = matrix[1][1]*module.m3x3({
		{matrix[2][2],matrix[2][3],matrix[2][4]},
		{matrix[3][2],matrix[3][3],matrix[3][4]},
		{matrix[4][2],matrix[4][3],matrix[4][4]}
	})
	local two = -matrix[1][2]*module.m3x3({
		{matrix[2][1],matrix[2][3],matrix[2][4]},
		{matrix[3][1],matrix[3][3],matrix[3][4]},
		{matrix[4][1],matrix[4][3],matrix[4][4]}
	})
	local three = matrix[1][3]*module.m3x3({
		{matrix[2][1],matrix[2][2],matrix[2][4]},
		{matrix[3][1],matrix[3][2],matrix[3][4]},
		{matrix[4][1],matrix[4][2],matrix[4][4]}
	})
	local four = -matrix[1][4]*module.m3x3({
		{matrix[2][1],matrix[2][2],matrix[2][3]},
		{matrix[3][1],matrix[3][2],matrix[3][3]},
		{matrix[4][1],matrix[4][2],matrix[4][3]}
	})
	--print(one,two,three,four)
	return one + two+three+four
end
function module.m5x5(matrix)
	local one = matrix[1][1]*module.m4x4({
		{matrix[2][2],matrix[2][3],matrix[2][4],matrix[2][5]},
		{matrix[3][2],matrix[3][3],matrix[3][4],matrix[3][5]},
		{matrix[4][2],matrix[4][3],matrix[4][4],matrix[4][5]},
		{matrix[5][2],matrix[5][3],matrix[5][4],matrix[5][5]}
	})
	local two = -matrix[1][2]*module.m4x4({
		{matrix[2][1],matrix[2][3],matrix[2][4],matrix[2][5]},
		{matrix[3][1],matrix[3][3],matrix[3][4],matrix[3][5]},
		{matrix[4][1],matrix[4][3],matrix[4][4],matrix[4][5]},
		{matrix[5][1],matrix[5][3],matrix[5][4],matrix[5][5]}
	})
	local three = matrix[1][3]*module.m4x4({
		{matrix[2][1],matrix[2][2],matrix[2][4],matrix[2][5]},
		{matrix[3][1],matrix[3][2],matrix[3][4],matrix[3][5]},
		{matrix[4][1],matrix[4][2],matrix[4][4],matrix[4][5]},
		{matrix[5][1],matrix[5][2],matrix[5][4],matrix[5][5]}
	})
	local four = -matrix[1][4]*module.m4x4({
		{matrix[2][1],matrix[2][2],matrix[2][3],matrix[2][5]},
		{matrix[3][1],matrix[3][2],matrix[3][3],matrix[3][5]},
		{matrix[4][1],matrix[4][2],matrix[4][3],matrix[4][5]},
		{matrix[5][1],matrix[5][2],matrix[5][3],matrix[5][5]}
	})
	local five = matrix[1][5]*module.m4x4({
		{matrix[2][1],matrix[2][2],matrix[2][3],matrix[2][4]},
		{matrix[3][1],matrix[3][2],matrix[3][3],matrix[3][4]},
		{matrix[4][1],matrix[4][2],matrix[4][3],matrix[4][4]},
		{matrix[5][1],matrix[5][2],matrix[5][3],matrix[5][4]}
	})
	--print(one,two,three,four,five)
	return one + two+three+four+five
end
function module.m6x6(matrix)
	local one = matrix[1][1]*module.m5x5({
		{matrix[2][2],matrix[2][3],matrix[2][4],matrix[2][5],matrix[2][6]},
		{matrix[3][2],matrix[3][3],matrix[3][4],matrix[3][5],matrix[3][6]},
		{matrix[4][2],matrix[4][3],matrix[4][4],matrix[4][5],matrix[4][6]},
		{matrix[5][2],matrix[5][3],matrix[5][4],matrix[5][5],matrix[5][6]},
		{matrix[6][2],matrix[6][3],matrix[6][4],matrix[6][5],matrix[6][6]}
	})
	local two = -matrix[1][2]*module.m5x5({
		{matrix[2][1],matrix[2][3],matrix[2][4],matrix[2][5],matrix[2][6]},
		{matrix[3][1],matrix[3][3],matrix[3][4],matrix[3][5],matrix[3][6]},
		{matrix[4][1],matrix[4][3],matrix[4][4],matrix[4][5],matrix[4][6]},
		{matrix[5][1],matrix[5][3],matrix[5][4],matrix[5][5],matrix[5][6]},
		{matrix[6][1],matrix[6][3],matrix[6][4],matrix[6][5],matrix[6][6]}
	})
	local three = matrix[1][3]*module.m5x5({
		{matrix[2][1],matrix[2][2],matrix[2][4],matrix[2][5],matrix[2][6]},
		{matrix[3][1],matrix[3][2],matrix[3][4],matrix[3][5],matrix[3][6]},
		{matrix[4][1],matrix[4][2],matrix[4][4],matrix[4][5],matrix[4][6]},
		{matrix[5][1],matrix[5][2],matrix[5][4],matrix[5][5],matrix[5][6]},
		{matrix[6][1],matrix[6][2],matrix[6][4],matrix[6][5],matrix[6][6]}
	})
	local four = -matrix[1][4]*module.m5x5({
		{matrix[2][1],matrix[2][2],matrix[2][3],matrix[2][5],matrix[2][6]},
		{matrix[3][1],matrix[3][2],matrix[3][3],matrix[3][5],matrix[3][6]},
		{matrix[4][1],matrix[4][2],matrix[4][3],matrix[4][5],matrix[4][6]},
		{matrix[5][1],matrix[5][2],matrix[5][3],matrix[5][5],matrix[5][6]},
		{matrix[6][1],matrix[6][2],matrix[6][3],matrix[6][5],matrix[6][6]}
	})
	local five = matrix[1][5]*module.m5x5({
		{matrix[2][1],matrix[2][2],matrix[2][3],matrix[2][4],matrix[2][6]},
		{matrix[3][1],matrix[3][2],matrix[3][3],matrix[3][4],matrix[3][6]},
		{matrix[4][1],matrix[4][2],matrix[4][3],matrix[4][4],matrix[4][6]},
		{matrix[5][1],matrix[5][2],matrix[5][3],matrix[5][4],matrix[5][6]},
		{matrix[6][1],matrix[6][2],matrix[6][3],matrix[6][4],matrix[6][6]}
	})
	local six = -matrix[1][6]*module.m5x5({
		{matrix[2][1],matrix[2][2],matrix[2][3],matrix[2][4],matrix[2][5]},
		{matrix[3][1],matrix[3][2],matrix[3][3],matrix[3][4],matrix[3][5]},
		{matrix[4][1],matrix[4][2],matrix[4][3],matrix[4][4],matrix[4][5]},
		{matrix[5][1],matrix[5][2],matrix[5][3],matrix[5][4],matrix[5][5]},
		{matrix[6][1],matrix[6][2],matrix[6][3],matrix[6][4],matrix[6][5]}
	})
	--print(one,two,three,four,five,six)
	return one , two,three,four,five,six
end
return module
