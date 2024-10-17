import Operation from "../Operation.mjs";
import { ZstdCodec } from "zstd-codec";

/**
 * Zstd Compress operation
 */
class ZstdCompress extends Operation {

    /**
     * ZstdCompress constructor
     */
    constructor() {
        super();

        this.name = "Zstd Compress";
        this.module = "Compression";
        this.description = "Zstandard (or Zstd) is a lossless data compression algorithm developed by Facebook. It offers a good balance between compression ratio and compression speed, and can provide high decompression speeds.";
        this.infoURL = "https://en.wikipedia.org/wiki/Zstandard";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.args = [
            {
                "name": "Compression Level",
                "type": "number",
                "value": 3,
                "min": 1,
                "max": 22
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {ArrayBuffer}
     */
    run(input, args) {
        const compressionLevel = args[0].value;

        // Create a new Promise-based method to wrap around the Zstd Codec
        return new Promise((resolve, reject) => {
            ZstdCodec.run(zstd => {
                const simple = new zstd.Simple();
                const uint8Input = new Uint8Array(input);
                const compressed = simple.compress(uint8Input, compressionLevel);
                if (compressed) {
                    resolve(compressed.buffer);
                } else {
                    reject(new Error("Compression failed"));
                }
            });
        });
    }

}

export default ZstdCompress;
