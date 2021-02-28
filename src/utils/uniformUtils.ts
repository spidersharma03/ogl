/**
 * Uniform Utilities,
 */
import {TUniforms} from "../oglextra/pbrmaterial";

export function cloneUniforms( src: TUniforms ) {
    const dst = {};
    for ( var u in src ) {
        dst[ u ] = {};
        for ( var p in src[ u ] ) {
            var property = src[ u ][ p ];
            if ( property && (typeof property.clone === 'function' ) ) {
                dst[ u ][ p ] = property.clone();
            } else if ( Array.isArray( property ) ) {
                dst[ u ][ p ] = property.slice();
            } else {
                dst[ u ][ p ] = property;
            }
        }
    }
    return dst;
}

export function mergeUniforms( uniforms ) {
    var merged = {};
    for ( var u = 0; u < uniforms.length; u ++ ) {
        var tmp = cloneUniforms( uniforms[ u ] );
        for ( var p in tmp ) {
            merged[ p ] = tmp[ p ];
        }
    }
    return merged;
}