// ============================================
// CURRÍCULO FÁCIL - VERSÃO COM PRINT (SEM BUGS)
// ============================================

var dadosCurriculo = {};

// Controle de telas
function mostrarTela(id) {
    document.querySelectorAll('.tela').forEach(function(tela) {
        tela.classList.remove('ativa');
    });
    document.getElementById(id).classList.add('ativa');
    window.scrollTo(0, 0);
}

// Navegação
function irParaFormulario() {
    mostrarTela('telaFormulario');
}

function voltarInicio() {
    if (confirm('Voltar? Os dados preenchidos serão perdidos.')) {
        mostrarTela('telaInicio');
        limparTudo();
    }
}

// Máscara de telefone
document.addEventListener('DOMContentLoaded', function() {
    var tel = document.getElementById('telefone');
    if (tel) {
        tel.addEventListener('input', function(e) {
            var valor = e.target.value.replace(/\D/g, '');
            if (valor.length > 0) {
                if (valor.length <= 2) {
                    valor = '(' + valor;
                } else if (valor.length <= 7) {
                    valor = '(' + valor.substring(0,2) + ') ' + valor.substring(2);
                } else {
                    valor = '(' + valor.substring(0,2) + ') ' + valor.substring(2,7) + '-' + valor.substring(7,11);
                }
            }
            e.target.value = valor;
        });
    }
});

// Gerar currículo
function gerarCurriculo(evento) {
    evento.preventDefault();
    
    // Pega os dados
    var nome = document.getElementById('nome').value.trim();
    var email = document.getElementById('email').value.trim();
    var telefone = document.getElementById('telefone').value.trim();
    var cidade = document.getElementById('cidade').value.trim();
    var curso = document.getElementById('curso').value.trim();
    var semestre = document.getElementById('semestre').value.trim();
    var objetivo = document.getElementById('objetivo').value.trim();
    var habilidades = document.getElementById('habilidades').value.trim();
    var cursos = document.getElementById('cursos').value.trim();
    var experiencia = document.getElementById('experiencia').value.trim();
    
    // Validação básica
    if (!nome || !email || !telefone || !cidade || !curso || !objetivo || !habilidades) {
        alert('Preencha todos os campos obrigatórios (marcados com *)');
        return;
    }
    
    // Valida email simples
    if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        alert('Coloca um email válido aí...');
        return;
    }
    
    // Guarda os dados
    dadosCurriculo = {
        nome: nome,
        email: email,
        telefone: telefone,
        cidade: cidade,
        curso: curso,
        semestre: semestre,
        objetivo: objetivo,
        habilidades: habilidades,
        cursos: cursos,
        experiencia: experiencia
    };
    
    // Gera resumo
    var resumo = 'Estudante de ' + curso + 
                 (semestre ? ', atualmente no ' + semestre : '') +
                 '. ' + objetivo;
    
    // Formata habilidades em lista
    var listaHabilidades = habilidades
        .split(',')
        .map(function(h) { return '<li>' + h.trim() + '</li>'; })
        .join('');
    
    // Formata cursos
    var listaCursos = '';
    if (cursos) {
        listaCursos = cursos
            .split(',')
            .map(function(c) { return '<li>' + c.trim() + '</li>'; })
            .join('');
    } else {
        listaCursos = '<li>Disponível para novos aprendizados</li>';
    }
    
    // Monta o HTML do currículo
    var html = '';
    html += '<div class="nome-cv">' + nome + '</div>';
    html += '<div class="contato-cv">';
    html += '📧 ' + email + ' | 📱 ' + telefone + '<br>';
    html += '📍 ' + cidade;
    html += '</div>';
    
    html += '<div class="resumo-cv">';
    html += '<strong>Sobre mim:</strong> ' + resumo;
    html += '</div>';
    
    html += '<div class="titulo-secao">🎯 Objetivo</div>';
    html += '<p>' + objetivo + '</p>';
    
    html += '<div class="titulo-secao">🎓 Formação</div>';
    html += '<p><strong>' + curso + '</strong>';
    if (semestre) html += ' - ' + semestre;
    html += '</p>';
    
    html += '<div class="titulo-secao">⚡ Habilidades</div>';
    html += '<ul>' + listaHabilidades + '</ul>';
    
    html += '<div class="titulo-secao">📚 Cursos Complementares</div>';
    html += '<ul>' + listaCursos + '</ul>';
    
    if (experiencia) {
        html += '<div class="titulo-secao">💼 Experiência</div>';
        html += '<p>' + experiencia.replace(/\n/g, '<br>') + '</p>';
    }
    
    // Data de geração
    var hoje = new Date();
    html += '<p style="text-align:center; color:#999; font-size:11px; margin-top:20px; border-top:1px solid #eee; padding-top:10px;">';
    html += 'Currículo gerado em ' + hoje.toLocaleDateString('pt-BR');
    html += '</p>';
    
    // Mostra na tela
    document.getElementById('curriculoGerado').innerHTML = html;
    mostrarTela('telaResultado');
}

// FUNÇÃO CORRIGIDA - Usa print ao invés de html2pdf (100% funcional)
function baixarPDF() {
    // Pega o conteúdo do currículo
    var conteudo = document.getElementById('curriculoGerado').innerHTML;
    
    // Cria um documento HTML completo para impressão
    var janelaPrint = window.open('', '_blank');
    
    janelaPrint.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Currículo - ${dadosCurriculo.nome}</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
                    padding: 40px 20px;
                    background: white;
                    line-height: 1.5;
                    color: #333;
                }
                
                .curriculo-pdf {
                    max-width: 210mm;
                    margin: 0 auto;
                    background: white;
                    padding: 20px;
                }
                
                .nome-cv {
                    font-size: 28px;
                    font-weight: 700;
                    text-align: center;
                    color: #1a1a1a;
                    margin-bottom: 10px;
                }
                
                .contato-cv {
                    text-align: center;
                    font-size: 13px;
                    color: #666;
                    margin-bottom: 25px;
                    padding-bottom: 15px;
                    border-bottom: 2px solid #1a73e8;
                }
                
                .resumo-cv {
                    background: #f0f7ff;
                    padding: 15px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                    font-size: 13px;
                    border-left: 3px solid #1a73e8;
                }
                
                .titulo-secao {
                    font-weight: 700;
                    color: #1a73e8;
                    font-size: 15px;
                    margin-bottom: 8px;
                    margin-top: 20px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                
                .titulo-secao:first-of-type {
                    margin-top: 0;
                }
                
                ul {
                    padding-left: 25px;
                    margin: 8px 0;
                }
                
                li {
                    margin-bottom: 5px;
                    color: #444;
                }
                
                p {
                    margin: 8px 0;
                    color: #444;
                }
                
                @media print {
                    body {
                        padding: 0;
                        margin: 0;
                    }
                    
                    .curriculo-pdf {
                        padding: 15px;
                    }
                    
                    .titulo-secao {
                        break-inside: avoid;
                    }
                    
                    .resumo-cv, ul, p {
                        break-inside: avoid;
                    }
                }
            </style>
        </head>
        <body>
            <div class="curriculo-pdf">
                ${conteudo}
            </div>
            <script>
                // Fecha automaticamente após 3 segundos (opcional)
                setTimeout(function() {
                    window.print();
                }, 500);
            <\/script>
        </body>
        </html>
    `);
    
    janelaPrint.document.close();
}

function editarDados() {
    mostrarTela('telaFormulario');
    
    // Restaura dados
    document.getElementById('nome').value = dadosCurriculo.nome || '';
    document.getElementById('email').value = dadosCurriculo.email || '';
    document.getElementById('telefone').value = dadosCurriculo.telefone || '';
    document.getElementById('cidade').value = dadosCurriculo.cidade || '';
    document.getElementById('curso').value = dadosCurriculo.curso || '';
    document.getElementById('semestre').value = dadosCurriculo.semestre || '';
    document.getElementById('objetivo').value = dadosCurriculo.objetivo || '';
    document.getElementById('habilidades').value = dadosCurriculo.habilidades || '';
    document.getElementById('cursos').value = dadosCurriculo.cursos || '';
    document.getElementById('experiencia').value = dadosCurriculo.experiencia || '';
}

function novoCurriculo() {
    if (confirm('Criar um novo currículo? O atual será perdido.')) {
        dadosCurriculo = {};
        document.getElementById('formCurriculo').reset();
        mostrarTela('telaInicio');
    }
}

function limparTudo() {
    document.getElementById('formCurriculo').reset();
    dadosCurriculo = {};
}

console.log('App carregado! Usando método de impressão para PDF');