local draw = true
Timer = require "timer"
matrix = require "matrix"
local count = 1
local pointarray = {}
local parray= {}
local calculated = false
r=0
A=0
B=0
C=0
D=0
E=0
F=0
Semimajor = 0
Semiminor = 0
function love.load()
    --success = love.window.setMode(800 , 600 )
    love.graphics.setBackgroundColor( 1, 1, 1, 0 )
    h3 = love.graphics.newFont("tnr.ttf", 26)
    h1 = love.graphics.newFont("tnrB.ttf", 34)
    text = ""
end

function love.textinput(t)
    -- Append the typed character to the text variable
    text = text .. t
end
function love.keypressed(key)
    -- Use backspace to delete the last character in the text
    if key == "delete" or key == "backspace" then
        text = text:sub( 1, #text - 1 ) -- limits string from the first to the second last character
    end
    if key == "enter" or key == "return" then
        draw = false
        exists = love.filesystem.getInfo( text )
        if exists then
            image = love.graphics.newImage(text)
        end
    end
end
function love.mousepressed( x, y, button, istouch, presses )
    if exists and count<=5 and not calculated then
        pointarray[count]={}
        parray[count]={x,y,0,1,1,1}
        pointarray[count][1]=x/100
        pointarray[count][2]=y/100
        count = count+1
        --print("WORKS")
    elseif not calculated then
        local a,b,c,d,e,f = matrix.m6x6({
			{1,1,1,1,1,1},
			{pointarray[1][1]^2,pointarray[1][1]*pointarray[1][2],pointarray[1][2]^2,pointarray[1][1],pointarray[1][2],1},
			{pointarray[2][1]^2,pointarray[2][1]*pointarray[2][2],pointarray[2][2]^2,pointarray[2][1],pointarray[2][2],1},
			{pointarray[3][1]^2,pointarray[3][1]*pointarray[3][2],pointarray[3][2]^2,pointarray[3][1],pointarray[3][2],1},
			{pointarray[4][1]^2,pointarray[4][1]*pointarray[4][2],pointarray[4][2]^2,pointarray[4][1],pointarray[4][2],1},
			{pointarray[5][1]^2,pointarray[5][1]*pointarray[5][2],pointarray[5][2]^2,pointarray[5][1],pointarray[5][2],1},
		})
        r = math.atan2(b,(a-c))/2
		A=a*math.cos(r)^2+b*math.sin(r)*math.cos(r) +c*math.sin(r)^2
		B= b*(math.cos(r)^2-math.sin(r)^2)+2*(c-a)*math.sin(r)*math.cos(r)
		C = a*math.sin(r)^2-b*math.sin(r)*math.cos(r)+c*math.cos(r)^2
		D = d*math.cos(r)+e*math.sin(r)
		E = e*math.cos(r)-d*math.sin(r)
		F = f
        
		Semimajor = math.max(math.sqrt((-F+(D^2)/(4*A)+(E^2)/(4*C))/C),math.sqrt((-F+(D^2)/(4*A)+(E^2)/(4*C))/A))
		Semiminor = math.min(math.sqrt((-F+(D^2)/(4*A)+(E^2)/(4*C))/C),math.sqrt((-F+(D^2)/(4*A)+(E^2)/(4*C))/A))
        impactAngle = math.deg(math.atan(math.sqrt((Semiminor^2)/(Semimajor^2-Semiminor^2))))
        calculated = true
    else
        love.system.setClipboardText("rotation : "..math.deg(r).."deg, ".."constant : "..A..", "..B..", "..C..", "..D.." "..E..", "..F..", ".."semimajor and minor : "..Semimajor..", "..Semiminor..", ".."angleofImpact"..impactAngle)
    end
end
function love.draw()
    -- Display the text on screen
    if draw == true then
        love.graphics.setColor(0,0,0,1)
        love.graphics.setFont(h1)
        love.graphics.printf("Enter file path", 0, love.graphics.getHeight() / 8, love.graphics.getWidth(), 'center')
        love.graphics.setFont(h3)
        love.graphics.printf(text, 0, love.graphics.getHeight() / 4, love.graphics.getWidth(), 'center')
    elseif exists and not calculated then
        love.graphics.setColor(1,1,1,1)
        local w = image:getWidth()
        local h = image:getHeight()
        local sx = love.graphics.getWidth() / w
        local sy = love.graphics.getHeight() / h
        love.graphics.draw(image,  (love.graphics.getWidth()-w* math.min(sx,sy))/2,(love.graphics.getHeight()- h* math.min(sx,sy))/2, 0, math.min(sx,sy))
        love.graphics.setPointSize(5)
        love.graphics.points(parray)
        --love.graphics.setColor(0,0,0,1)
        --love.graphics.printf("rotation:"..math.deg(r).."deg", 0, love.graphics.getHeight() / 8, love.graphics.getWidth(), 'center')
        --love.graphics.printf("constant:"..A.." "..B.." "..C.." "..D.." "..E.." "..F, 0, love.graphics.getHeight() / 4, love.graphics.getWidth(), 'center')
        --love.graphics.printf("semimajor and minor:"..Semimajor.." "..Semiminor, 0, 3*love.graphics.getHeight() / 8, love.graphics.getWidth(), 'center')
    elseif calculated then
        love.graphics.setColor(0,0,0,1)
        love.graphics.printf("rotation: "..math.deg(r).."deg", 0, love.graphics.getHeight() / 8, love.graphics.getWidth(), 'center')
        love.graphics.printf("constant: "..A..", "..B..", "..C..", "..D.." "..E..", "..F, 0, love.graphics.getHeight() / 4, love.graphics.getWidth(), 'center')
        love.graphics.printf("semimajor and minor: "..Semimajor..", "..Semiminor, 0, 4*love.graphics.getHeight() / 8, love.graphics.getWidth(), 'center')
        love.graphics.printf("angle of impact: "..impactAngle, 0, 5*love.graphics.getHeight() / 8, love.graphics.getWidth(), 'center')
        love.graphics.printf("click to copy to clipboard", 0, 6*love.graphics.getHeight() / 8, love.graphics.getWidth(), 'center')
    else
        love.graphics.setFont(h1)
        love.graphics.printf("Wrong file path", 0, love.graphics.getHeight() / 2, love.graphics.getWidth(), 'center')
        Timer.after(3,function() draw = false image = nil end)
    end
end