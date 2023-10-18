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
     * Parameter of first degree equation (ax+b = 0)
     * @param {Number} b 
     * Parameter of first degree equation (ax+b = 0)
     * @returns {Array<EquationSolver.Root>}
     * An array of Root objects 
     */
    static #firstDegreeEquationSolver(a, b) {
        return b < 0 ? new this.Root(b / a, 0) : new this.Root((-1) * b / a, 0);
    }

    /**
    * @method
    * Solves the second degree equations
    * @param {Number} a 
    * Parameter of second degree equation (ax^2+bx+c = 0)
    * @param {Number} b 
    * Parameter of second degree equation (ax^2+bx+c = 0)
    * @param {Number} c 
    * Parameter of second degree equation (ax^2+bx+c = 0)
    * @returns {Array<EquationSolver.Root>}
    * An array of Root objects 
    */
    static #secondDegreeEquationSolver(a, b, c) {
        if (a === 0) return [new this.Root(-c / b, 0)];
        const delta = Math.pow(b, 2) - 4 * a * c;
        return delta < 0 ?
            [
                new this.Root(-b / (2 * a), Math.sqrt(Math.abs(delta)) / (2 * a)),
                new this.Root(-b / (2 * a), -Math.sqrt(Math.abs(delta)) / (2 * a))
            ] :
            [
                new this.Root((-b + Math.sqrt(delta)) / (2 * a), 0),
                new this.Root((-b - Math.sqrt(delta)) / (2 * a), 0)
            ]
    }

    /**
    * @method
    * Solves the third degree equations
    * @param {Number} a 
    * Parameter of third degree equation (ax^3+bx^2+cx+d = 0)
    * @param {Number} b 
    * Parameter of third degree equation (ax^3+bx^2+cx+d = 0)
    * @param {Number} c 
    * Parameter of third degree equation (ax^3+bx^2+cx+d = 0)
    * @param {Number} d 
    * Parameter of third degree equation (ax^3+bx^2+cx+d = 0)
    * @returns {Array<EquationSolver.Root>}
    * An array of Root objects 
    */
    static #thirdDegreeEquationSolver(a, b, c, d) {
        if (d === 0) return [new this.Root(0, 0)].concat(this.#secondDegreeEquationSolver(a, b, c));

        //using Tartaglia-Cardano method
        const A = b / a;
        const B = c / a;
        const C = d / a;

        const p = B - Math.pow(A, 2) / 3;
        const q = C + 2 * Math.pow(A, 3) / 27 - A * B / 3;
        const delta = Math.pow(q, 2) / 4 + Math.pow(p, 3) / 27;
        if (delta >= 0) {
            const y1 = Math.cbrt((-q / 2) + Math.sqrt(delta)) + Math.cbrt((-q / 2) - Math.sqrt(delta));
            const delta2 = -(3 * Math.pow(y1, 2) + 4 * p);
            const root1 = new this.Root(y1 - A / 3, null);
            if (delta2 < 0) {
                const root2 = new this.Root(-y1 / 2 - A / 3, Math.sqrt(Math.abs(delta2)) / 2);
                const root3 = new this.Root(-y1 / 2 - A / 3, -Math.sqrt(Math.abs(delta2)) / 2);
                return [root1, root2, root3];
            }
            const root2 = new this.Root(((-y1 + Math.sqrt(delta2)) / 2) - A / 3, 0);
            const root3 = new this.Root(((-y1 - Math.sqrt(delta2)) / 2) - A / 3, 0);
            return [root1, root2, root3];
        }

        //Using equations of Euler and DeMoivre
        const rho = Math.sqrt(Math.pow(q, 2) / 4 + Math.abs(delta))
        const theta = Math.acos(-q / (2 * rho));

        const y1 = 2 * Math.cbrt(rho) * Math.cos(theta / 3);
        const y2 = 2 * Math.cbrt(rho) * Math.cos((theta + 2 * Math.PI) / 3);
        const y3 = 2 * Math.cbrt(rho) * Math.cos((theta + 4 * Math.PI) / 3);

        return [
            new this.Root(y1 - A / 3, 0),
            new this.Root(y2 - A / 3, 0),
            new this.Root(y3 - A / 3, 0)
        ]

    }
    /**
     * @method
     * Solves the first, second or third degree equations
     * @param {Number} a 
     * Parameter of third degree equation (ax^3+bx^2+cx+d = 0). 
     * Needs to be 0 for first and second degree equations
     * @param {Number} b 
     * Parameter of third degree equation (ax^3+bx^2+cx+d = 0)
     * Needs to be 0 for first degree equations
     * @param {Number} c 
     * Parameter of third degree equation (ax^3+bx^2+cx+d = 0)
     * @throws {TypeError}
     * A TypeError when "a", "b", "c" and/or "d" aren't a number
     * @throws {RangeError}
     * A RangeError when "c" and/or "d" are equal to 0
     * @returns {Array<EquationSolver.Root>}
     * An array of Root objects 
     */
    static solver(a, b, c, d) {
        if (Number.isNaN(a) || Number.isNaN(b) || Number.isNaN(c) || Number.isNaN(d)) {
            const typeErrorMsg = "\"a\", \"b\", \"c\" and \"d\" parameters must be a number!";
            throw new TypeError(typeErrorMsg);
        }
        if (c == 0 || d == 0) {
            const rangeErrorMsg = "\"c\" and \"d\" parameters must be different of 0!";
            throw new RangeError(rangeErrorMsg);
        }
        if (a == 0 && b == 0) return this.#firstDegreeEquationSolver(c, d);
        if (a == 0) return this.#secondDegreeEquationSolver(b, c, d);
        return this.#thirdDegreeEquationSolver(a, b, c, d);
    }
}