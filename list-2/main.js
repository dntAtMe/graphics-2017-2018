let vertexShaderSrc = `#version 300 es
    in vec2 a_position;
    in vec4 a_color;

    uniform vec2 u_resolution;
    uniform mat3 u_matrix;

    out vec4 v_color;

    void main() {
        vec2 position = (u_matrix * vec3(a_position , 1)).xy;
        vec2 zeroToOne = position / u_resolution;
        vec2 zeroToTwo = zeroToOne * 2.0;
        vec2 clipSpace = zeroToTwo - 1.0;

        v_color = vec4(1,0,0,1); 
        
        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

    }
    `;

let fragmentShaderSrc = `#version 300 es
    precision mediump float;

    in vec4 v_color;

    out vec4 outColor;

    void main() {
        outColor = vec4(1,0,0,1);
    }
`;




function main() {
    let gl = getGLContext("canvas");
    let program = createProgram(gl, [vertexShaderSrc, fragmentShaderSrc], [gl.VERTEX_SHADER, gl.FRAGMENT_SHADER] );

    let positionAttribLocation = gl.getAttribLocation(program, "a_position");
    let colorAttribLocation = gl.getAttribLocation(program, "a_color");

    let resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
    let matrixUniformLocation = gl.getUniformLocation(program, "u_matrix");

    let positionBuffer = gl.createBuffer();
    let vao = gl.createVertexArray();

    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(positionAttribLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            0, 0, 
            100, 0,
            100, 100,
        ]),
        gl.STATIC_DRAW);

    let size = 2;
    let type = gl.FLOAT;
    let normalize = false;
    let stride = 0;
    let offset = 0;
    gl.vertexAttribPointer(
        positionAttribLocation, size, type, normalize, stride, offset
    );

    let translation = [150, 150];
    let rotation = 0;
    let scale = [1, 1];

    drawScene();

    function drawScene() {
        resizeCanvasToDisplaySize(gl.canvas);

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.useProgram(program);
        gl.bindVertexArray(vao);

        gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
        
        let translationMatrix = m3.translation(translation[0], translation[1]);
        let rotationMatrix = m3.rotation(rotation);
        let scaleMatrix = m3.scale(scale[0], scale[1]);

        let matrix = m3.multiply(translationMatrix, rotationMatrix);
        matrix = m3.multiply(matrix, scaleMatrix);

        gl.uniformMatrix3fv(matrixUniformLocation, false, matrix);

        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

}

main();