import Operation from "../Operation.mjs";
import { ZstdCodec } from "zstd-codec";

/**
 * Zstd Decompress operation
 */
class ZstdDecompress extends Operation {

    /**
     * ZstdDecompress constructor
     */
    constructor() {
        super();

        this.name = "Zstd Decompress";
        this.module = "Compression";
        this.description = "Zstandard (or Zstd) is a lossless data compression algorithm developed by Facebook. It is designed to offer a very wide range of compression/speed trade-off while proving better decompression speeds.";
        this.infoURL = "https://en.wikipedia.org/wiki/Zstandard";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.args = [];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {ArrayBuffer}
     */
    run(input, args) {
        return new Promise((resolve, reject) => {
            ZstdCodec.run(zstd => {
                const simple = new zstd.Simple();
                const uint8Input = new Uint8Array(input);
                try {
                    const decompressed = simple.decompress(uint8Input);
                    resolve(decompressed.buffer);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

}

export default ZstdDecompress;
