import turtle

# Do NOT rename this function as it will stop the judge from finding what code to run, resulting in a failure
def drawing(pen: turtle.Turtle):
    t = pen
    t.speed(0)
    t.penup()
    t.goto(-150, 150)
    
    # Draw green background
    t.pendown()
    t.color("green")
    t.begin_fill()
    for _ in range(4):
        t.forward(300)
        t.right(90)
    t.end_fill()
    
    # Draw eyes
    eye_size = 60
    eye_positions = [(-90, 90), (30, 90)]
    t.color("black")
    for pos in eye_positions:
        t.penup()
        t.goto(pos)
        t.pendown()
        t.begin_fill()
        for _ in range(4):
            t.forward(eye_size)
            t.right(90)
        t.end_fill()
    # Draw mouth
    mouth_positions = [(-90, -30), (-30, -30), (-30, -90), (30, -30), (30, -90)]
    for pos in mouth_positions:
        t.penup()
        t.goto(pos)
        t.pendown()
        t.begin_fill()
        for _ in range(4):
            t.forward(eye_size)
            t.right(90)
        t.end_fill()


    def draw_square(t, size, color):
        t.begin_fill()
        t.color(color)
        for _ in range(4):
            t.forward(size)
            t.right(90)
        t.end_fill()

"""
#################
!!Do NOT edit the code below!!
#################
"""
if __name__ == "__main__":
    pen = turtle.Turtle()
    drawing(pen)
    turtle.done()