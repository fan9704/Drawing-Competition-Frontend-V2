import turtle as turtle
import sys

"""
#################
Start your algorithm from here !!
#################
"""


def drawing():
    t.right(90)
    t.forward(100)
    t.left(90)
    t.backward(100)
    return


"""
#################
!!Don't touch the code below!!
Unless you want to uncomment the 'turtle.done()' line
#################
'turtle.done()' is used to keep the turtle graphics window open
Uncomment the line if you want to see the turtle graphics window

However, when judging your code, we don't want to see the turtle graphics window, 
so we commented it
#################
"""
if __name__ == "__main__":
    result_path = sys.argv[1]  # Accept output path as a command-line argument
    s = turtle.getscreen()
    t = turtle.Turtle()
    drawing()
    canvas = s.getcanvas()
    canvas.postscript(file=result_path)
    # turtle.done() # Uncomment this line if you want to keep the turtle graphics window open
