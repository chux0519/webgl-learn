(function () {
  const utils = {
    loadShader,
    initShaderProgram
  }

  const logger = {
    error (str) {
      if (window && window.alert) return window.alert(str)
      console.error(str)
    },
    info (str) {
      console.log(str)
    }
  }

  function loadShader (gl, type, source) {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      logger.error('An error occured compiling the shaders: ' + gl.getShaderInfoLog(shader))
      gl.deleteShader(shader)
      return null
    }
    return shader
  }

  function initShaderProgram (gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)
    const shaderProgram = gl.createProgram()
    gl.attachShader(shaderProgram, vertexShader)
    gl.attachShader(shaderProgram, fragmentShader)
    gl.linkProgram(shaderProgram)

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      logger.error('Unable to initalize the shader program: ' + gl.getProgramInfoLog)
      return null
    }
    return shaderProgram
  }

  if (window) {
    window._ = utils
    window.logger = logger
  }
  // if (module) {
  //   module.exports = {_: utils, logger}
  // }
})()
