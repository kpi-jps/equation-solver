# Equation Solver


## Description
Based on a javascript utiliy class, this application is able to give numeric solutions for first, second and third degree equations, considering real and complex roots.


## Use
To use the application, download the *EquationSolver.js* and use it in a script tag inside an html file:

    <!DOCTYPE html>
        <html lang="en">
            <head>
                <script src="EquationSolver.js"></script>
            </head>
        </html>

The `EquationSolver` class makes avaiable just one public static method named **solver**, that receives 4 numbers as parameters representing the coefficients *a*, *b*, *c* and *d* for third degree equations (***a****x*³ + ***b****x*² + ***c****x* + ***d*** = 0). 

If *a* was past as 0 to the method, it will return the solution for a second degree equation. If *a* and *b* were passed as 0, the method will return the solution for a first degree equation. The coefficient *c* can't be equal to 0, for this value the method throws a `RangeError` object. If one or more method parameters isn't a `Number`, it throws a `TypeError` object.

Because the **solver** method throws `Error` objects, it needs to be use together try/catch statement:

    try {
        const solution = EquationSolver.solve(a, b, c, d);
        console.log(solution);
    } catch (error) {
        console.error(error)
    }

The `EquationSolver.solver(a,b,c,d)` returns a array of `Root` objects. `Root` objects are created by anonymous class inside the `EquationSolver` class. The `Root` objects has two private properties representing the real and complex value for a root. These values are accessed by means of two public methods `getReValue()` and `getImValue()`, both returns a `Number`. `Root` objects also has a method that informs the root type, returning a `String` (`informRootType()`); a method that returns a `String` representation of a root (`getRootAsString()`); a method that informs the root type returning a `String`; and a public static method that sets the decimal places for this string representation (`Root.setDecimalPlaces(decimalPlaces)`).


## Testing the application

The html *testing-interface* can be used to test the application. It can be download together with *EquationSolver* JS file.
