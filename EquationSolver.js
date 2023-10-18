/**
 * @class
 * Class containg static methods to solve first, second and third degree equations
 */
class EquationSolver {
    /**
     * @class
     * Anonymous class that represents the Root of solved equations
     */
    static Root = class {
        #re = null;
        #im = null;
        /**
         * @param {Number} decimalPlaces
         * A number for decimal places applied to root real and imaginary values
         */
        static #decimalPlaces = 2;
        /**
         * @constructor
         * The constructor of Root class
         * @param {Number} re 
         * A number that represents a real part of the root
         * @param {Number} im 
         * A number that represents an imaginary part of the root
         */
        constructor(re, im) {
            this.#re = re;
            this.#im = im;
        }

        /**
         * @method
         * Sets a decimal places for real and imaginary part a root
         * @param {Number} decimalPlaces 
         * A number for decimal places used to represent Roots as string 
         */
        static setDecimalPlaces(decimalPlaces) {
            this.#decimalPlaces = decimalPlaces;
        }

        /**
         * @method
         * Return the information about root type ("real root" or "complex root")
         * @returns {String}
         * Information about root type 
         */
        informRootType() {
            return this.#im == 0 ? 'complex root' : 'real root';
        }

        /**
         * @method
         * Return the value of real part of the Root object
         * @returns {Number}
         * The value of real part of the Root object
         */
        getReValue() {
            return this.#re;
        }

        /**
         * @method
         * Return the value of real part of the Root object as a string
         * @returns {String}
         * The value of real part of the Root object as a string
         */
        getReValueAsString() {
            return Number.isInteger(this.#re) ? this.#re.toString() : this.#re.toFixed(this.#decimalPlaces);
        }
        /**
         * @method
         * Return the value of imaginary part of the Root object
         * @returns {Number}
         * The value of real imaginary of the Root object
         */
        getImValue() {
            return this.#im;
        }
        /**
         * @method
         * Return the the real and imaginary part of the root as a string
         * @returns {String}
         * The the real and imaginary part of the root as a string
         */
        getImValueAsString() {
            return Number.isInteger(this.#im) ? this.#im.toString() + "i" : this.#im.toFixed(this.#decimalPlaces) + "i";
        }
        /**
         * @method
         * Returns a string representantion of root values
         * @returns {String}
         * The representantion of root values
         */
        getRootAsString() {
            if (this.#im == 0) return this.getReValueAsString();
            if (this.#re === 0) return this.getImValueAsString();
            return (this.#im > 0) ?
                this.getReValueAsString() + "+" + this.getImValueAsString() :
                this.getReValueAsString() + this.getImValueAsString();
        }
    }

    /**
     * @method
     * Solves the second degree equations
     * @param {Number} a 
     * "a" parameter of first degree equation (ax+b = 0)
     * @param {Number} b 
     * "b" parameter of first degree equation (ax+b = 0)
     * @returns {Array<EquationSolver.Root>}
     * An array of Root objects 
     */
    static #firstDegreeEquationSolver(a,b) {
        return b < 0 ? new this.Root( b / a, 0) : new this.Root((-1) * b / a, 0);
    }

     /**
     * @method
     * Solves the second degree equations
     * @param {Number} a 
     * "a" parameter of second degree equation (ax^2+bx+c = 0)
     * @param {Number} b 
     * "b" parameter of second degree equation (ax^2+bx+c = 0)
     * @param {Number} c 
     * "c" parameter of second degree equation (ax^2+bx+c = 0)
     * @returns {Array<EquationSolver.Root>}
     * An array of Root objects 
     */
     static #secondDegreeEquationSolver(a, b, c) {
        if (a === 0) return [new EquationSolver.Root(-c / b, null)];
        const delta = Math.pow(b, 2) - 4 * a * c;
        return delta < 0 ?
            [
                new EquationSolver.Root(-b / (2 * a), Math.sqrt(Math.abs(delta)) / (2 * a)),
                new EquationSolver.Root(-b / (2 * a), -Math.sqrt(Math.abs(delta)) / (2 * a))
            ] :
            [
                new EquationSolver.Root((-b + Math.sqrt(delta)) / (2 * a), null),
                new EquationSolver.Root((-b - Math.sqrt(delta)) / (2 * a), null)
            ]
    }

    
}