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
            if (im === 0 || im == null) this.#im = null;
            else this.#im = im;
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
            return this.#im != null ? 'complex root' : 'real root';
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
         * @returns {Number}
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
            if (this.#im == null) return this.getReValueAsString();
            if (this.#re == null || this.#re === 0) return this.getImValueAsString();
            return (this.#im > 0) ?
                this.getReValueAsString() + "+" + this.getImValueAsString() :
                this.getReValueAsString() + this.getImValueAsString();
        }
    }
}