/* =========================================================
   EASYCV
   Application Logic
========================================================= */


/* =========================================================
   STATE
========================================================= */

const STORAGE_KEY = "easycv-data";

let currentStep = 1;

let experiences = [];

let skills = [];


/* =========================================================
   DEFAULT DATA
========================================================= */

const defaultData = {
    nome: "",
    email: "",
    telefone: "",
    cidade: "",
    cargo: "",
    objetivo: "",
    curso: "",
    instituicao: "",
    situacao: "",
    semestre: "",
    cursos: "",
    experiences: [],
    skills: []
};


/* =========================================================
   ELEMENTS
========================================================= */

const landingPage =
    document.getElementById("landingPage");

const app =
    document.getElementById("app");

const startHeaderButton =
    document.getElementById("startHeaderButton");

const startHeroButton =
    document.getElementById("startHeroButton");

const exitButton =
    document.getElementById("exitButton");

const newResumeButton =
    document.getElementById("newResumeButton");

const continueButton =
    document.getElementById("continueButton");

const backButton =
    document.getElementById("backButton");

const printButton =
    document.getElementById("printButton");

const editButton =
    document.getElementById("editButton");

const mobilePreviewButton =
    document.getElementById("mobilePreviewButton");

const closePreviewButton =
    document.getElementById("closePreviewButton");

const previewPanel =
    document.querySelector(".preview-panel");

const saveStatus =
    document.getElementById("saveStatus");

const progressText =
    document.getElementById("progressText");

const progressBar =
    document.getElementById("progressBar");

const stepTitle =
    document.getElementById("stepTitle");

const stepDescription =
    document.getElementById("stepDescription");

const stepEyebrow =
    document.getElementById("stepEyebrow");

const experienceList =
    document.getElementById("experienceList");

const skillInput =
    document.getElementById("skillInput");

const addSkillButton =
    document.getElementById("addSkillButton");

const skillsContainer =
    document.getElementById("skillsContainer");

const toast =
    document.getElementById("toast");


/* =========================================================
   STEP INFORMATION
========================================================= */

const stepInfo = {

    1: {
        title: "Seu perfil",
        description:
            "Vamos começar pelas suas informações básicas."
    },

    2: {
        title: "Objetivo profissional",
        description:
            "Mostre rapidamente o que você está buscando."
    },

    3: {
        title: "Formação",
        description:
            "Adicione sua formação acadêmica."
    },

    4: {
        title: "Experiência",
        description:
            "Conte onde você já trabalhou e o que fez."
    },

    5: {
        title: "Habilidades",
        description:
            "Destaque competências que fazem diferença."
    },

    6: {
        title: "Finalizar",
        description:
            "Revise seu currículo e gere o PDF."
    }

};


/* =========================================================
   INPUTS
========================================================= */

const inputIds = [
    "nome",
    "email",
    "telefone",
    "cidade",
    "cargo",
    "objetivo",
    "curso",
    "instituicao",
    "situacao",
    "semestre",
    "cursos"
];


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    loadData();

    setupEvents();

    renderExperiences();

    renderSkills();

    updatePreview();

    updateProgress();

});


/* =========================================================
   EVENTS
========================================================= */

function setupEvents() {

    startHeaderButton.addEventListener(
        "click",
        openEditor
    );

    startHeroButton.addEventListener(
        "click",
        openEditor
    );

    exitButton.addEventListener(
        "click",
        closeEditor
    );

    newResumeButton.addEventListener(
        "click",
        createNewResume
    );

    continueButton.addEventListener(
        "click",
        nextStep
    );

    backButton.addEventListener(
        "click",
        previousStep
    );

    printButton.addEventListener(
        "click",
        printResume
    );

    editButton.addEventListener(
        "click",
        () => goToStep(1)
    );

    mobilePreviewButton.addEventListener(
        "click",
        openPreview
    );

    closePreviewButton.addEventListener(
        "click",
        closePreview
    );


    document
        .querySelectorAll(".step-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const step =
                        Number(button.dataset.step);

                    goToStep(step);

                }
            );

        });


    inputIds.forEach(id => {

        const input =
            document.getElementById(id);

        if (!input) return;

        input.addEventListener(
            "input",
            handleInput
        );

        input.addEventListener(
            "change",
            handleInput
        );

    });


    document
        .querySelectorAll("[data-objective]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    document.getElementById(
                        "objetivo"
                    ).value =
                        button.dataset.objective;

                    handleInput();

                }
            );

        });


    document
        .getElementById("telefone")
        .addEventListener(
            "input",
            formatPhone
        );


    addSkillButton.addEventListener(
        "click",
        addSkill
    );


    skillInput.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                event.preventDefault();

                addSkill();

            }

        }
    );


    document
        .getElementById("addExperienceButton")
        .addEventListener(
            "click",
            addExperience
        );

}


/* =========================================================
   OPEN / CLOSE APP
========================================================= */

function openEditor(event) {

    if (event) {
        event.preventDefault();
    }

    landingPage.classList.add("hidden");

    app.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

    updatePreview();

}


function closeEditor(event) {

    if (event) {
        event.preventDefault();
    }

    app.classList.add("hidden");

    landingPage.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   NEW RESUME
========================================================= */

function createNewResume() {

    const confirmed =
        confirm(
            "Criar um novo currículo?\n\nAs informações atuais serão apagadas."
        );

    if (!confirmed) {
        return;
    }

    localStorage.removeItem(STORAGE_KEY);

    inputIds.forEach(id => {

        const input =
            document.getElementById(id);

        if (input) {
            input.value = "";
        }

    });

    experiences = [];

    skills = [];

    currentStep = 1;

    renderExperiences();

    renderSkills();

    goToStep(1);

    updatePreview();

    showToast(
        "Novo currículo criado."
    );

}


/* =========================================================
   STEP NAVIGATION
========================================================= */

function nextStep() {

    if (currentStep < 6) {

        goToStep(
            currentStep + 1
        );

    }

}


function previousStep() {

    if (currentStep > 1) {

        goToStep(
            currentStep - 1
        );

    }

}


function goToStep(step) {

    if (step < 1 || step > 6) {
        return;
    }

    currentStep = step;


    document
        .querySelectorAll(".form-step")
        .forEach(form => {

            form.classList.toggle(
                "active",
                Number(form.dataset.formStep) === step
            );

        });


    document
        .querySelectorAll(".step-button")
        .forEach(button => {

            const buttonStep =
                Number(button.dataset.step);

            button.classList.toggle(
                "active",
                buttonStep === step
            );

            button.classList.toggle(
                "completed",
                buttonStep < step
            );

        });


    const info =
        stepInfo[step];

    stepTitle.textContent =
        info.title;

    stepDescription.textContent =
        info.description;

    stepEyebrow.textContent =
        `ETAPA ${String(step).padStart(2, "0")}`;


    backButton.style.visibility =
        step === 1
            ? "hidden"
            : "visible";


    continueButton.style.display =
        step === 6
            ? "none"
            : "inline-flex";


    updateProgress();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   PROGRESS
========================================================= */

function updateProgress() {

    const progress =
        Math.round(
            ((currentStep - 1) / 5) * 100
        );

    progressText.textContent =
        `${progress}%`;

    progressBar.style.width =
        `${progress}%`;

}


/* =========================================================
   INPUT HANDLING
========================================================= */

function handleInput() {

    saveData();

    updatePreview();

}


function getCurrentData() {

    const data = {};

    inputIds.forEach(id => {

        const input =
            document.getElementById(id);

        data[id] =
            input
                ? input.value
                : "";

    });

    data.experiences =
        experiences;

    data.skills =
        skills;

    return data;

}


/* =========================================================
   SAVE
========================================================= */

function saveData() {

    const data =
        getCurrentData();

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );

    saveStatus.textContent =
        "Salvando...";

    clearTimeout(
        window.saveTimer
    );

    window.saveTimer =
        setTimeout(() => {

            saveStatus.textContent =
                "Alterações salvas";

        }, 500);

}


/* =========================================================
   LOAD
========================================================= */

function loadData() {

    const stored =
        localStorage.getItem(
            STORAGE_KEY
        );

    if (!stored) {
        return;
    }

    try {

        const data =
            JSON.parse(stored);

        inputIds.forEach(id => {

            const input =
                document.getElementById(id);

            if (
                input &&
                data[id] !== undefined
            ) {

                input.value =
                    data[id];

            }

        });

        experiences =
            Array.isArray(data.experiences)
                ? data.experiences
                : [];

        skills =
            Array.isArray(data.skills)
                ? data.skills
                : [];

    } catch (error) {

        console.error(
            "Erro ao carregar dados:",
            error
        );

    }

}


/* =========================================================
   PHONE FORMAT
========================================================= */

function formatPhone(event) {

    let value =
        event.target.value
            .replace(/\D/g, "")
            .slice(0, 11);

    if (value.length <= 10) {

        value =
            value.replace(
                /^(\d{2})(\d)/,
                "($1) $2"
            );

        value =
            value.replace(
                /(\d{4})(\d)/,
                "$1-$2"
            );

    } else {

        value =
            value.replace(
                /^(\d{2})(\d)/,
                "($1) $2"
            );

        value =
            value.replace(
                /(\d{5})(\d)/,
                "$1-$2"
            );

    }

    event.target.value =
        value;

    handleInput();

}


/* =========================================================
   EXPERIENCES
========================================================= */

function addExperience() {

    experiences.push({
        cargo: "",
        empresa: "",
        periodo: "",
        descricao: ""
    });

    renderExperiences();

    saveData();

    updatePreview();

}


function removeExperience(index) {

    experiences.splice(
        index,
        1
    );

    renderExperiences();

    saveData();

    updatePreview();

}


function updateExperience(
    index,
    field,
    value
) {

    experiences[index][field] =
        value;

    saveData();

    updatePreview();

}


function renderExperiences() {

    if (!experiences.length) {

        experienceList.innerHTML = `
            <div class="experience-empty">
                Nenhuma experiência adicionada ainda.
                <br>
                Clique em "+ Adicionar" para começar.
            </div>
        `;

        return;
    }


    experienceList.innerHTML =
        experiences
            .map(
                (experience, index) => `

                <article class="experience-card">

                    <button
                        type="button"
                        class="remove-experience"
                        onclick="removeExperience(${index})"
                        aria-label="Remover experiência"
                    >
                        ×
                    </button>


                    <div class="experience-card-grid">

                        <div class="field">

                            <label>
                                Cargo
                            </label>

                            <input
                                type="text"
                                value="${escapeHtml(experience.cargo)}"
                                placeholder="Ex.: Suporte Técnico"
                                oninput="updateExperience(${index}, 'cargo', this.value)"
                            >

                        </div>


                        <div class="field">

                            <label>
                                Empresa
                            </label>

                            <input
                                type="text"
                                value="${escapeHtml(experience.empresa)}"
                                placeholder="Nome da empresa"
                                oninput="updateExperience(${index}, 'empresa', this.value)"
                            >

                        </div>


                        <div class="field">

                            <label>
                                Período
                            </label>

                            <input
                                type="text"
                                value="${escapeHtml(experience.periodo)}"
                                placeholder="Ex.: Jan 2025 — Atual"
                                oninput="updateExperience(${index}, 'periodo', this.value)"
                            >

                        </div>


                        <div class="field full">

                            <label>
                                Principais atividades
                            </label>

                            <textarea
                                rows="5"
                                placeholder="Descreva suas principais atividades..."
                                oninput="updateExperience(${index}, 'descricao', this.value)"
                            >${escapeHtml(experience.descricao)}</textarea>

                        </div>

                    </div>

                </article>

            `
            )
            .join("");

}


/* =========================================================
   SKILLS
========================================================= */

function addSkill() {

    const value =
        skillInput.value.trim();

    if (!value) {
        return;
    }

    const exists =
        skills.some(
            skill =>
                skill.toLowerCase() ===
                value.toLowerCase()
        );

    if (exists) {

        showToast(
            "Essa habilidade já foi adicionada."
        );

        return;

    }

    skills.push(value);

    skillInput.value = "";

    renderSkills();

    saveData();

    updatePreview();

}


function removeSkill(index) {

    skills.splice(
        index,
        1
    );

    renderSkills();

    saveData();

    updatePreview();

}


function renderSkills() {

    if (!skills.length) {

        skillsContainer.innerHTML = `
            <span class="field-help">
                Nenhuma habilidade adicionada.
            </span>
        `;

        return;
    }


    skillsContainer.innerHTML =
        skills
            .map(
                (skill, index) => `

                    <span class="skill-tag">

                        ${escapeHtml(skill)}

                        <button
                            type="button"
                            onclick="removeSkill(${index})"
                            aria-label="Remover habilidade"
                        >
                            ×
                        </button>

                    </span>

                `
            )
            .join("");

}


/* =========================================================
   PREVIEW
========================================================= */

function updatePreview() {

    const data =
        getCurrentData();


    document.getElementById(
        "previewName"
    ).textContent =
        data.nome ||
        "Seu Nome";


    document.getElementById(
        "previewRole"
    ).textContent =
        data.cargo ||
        "Cargo desejado";


    document.getElementById(
        "previewEmail"
    ).textContent =
        data.email ||
        "email@email.com";


    document.getElementById(
        "previewPhone"
    ).textContent =
        data.telefone ||
        "(00) 00000-0000";


    document.getElementById(
        "previewCity"
    ).textContent =
        data.cidade ||
        "Cidade — UF";


    const objective =
        document.getElementById(
            "previewObjective"
        );

    objective.textContent =
        data.objetivo ||
        "Seu objetivo profissional aparecerá aqui.";


    updateExperiencePreview();

    updateEducationPreview();

    updateSkillsPreview();


    const courses =
        document.getElementById(
            "previewCourses"
        );

    courses.textContent =
        data.cursos ||
        "Seus cursos aparecerão aqui.";

}


/* =========================================================
   EXPERIENCE PREVIEW
========================================================= */

function updateExperiencePreview() {

    const container =
        document.getElementById(
            "previewExperience"
        );


    if (!experiences.length) {

        container.innerHTML = `
            <p class="resume-empty">
                Suas experiências aparecerão aqui.
            </p>
        `;

        return;
    }


    const validExperiences =
        experiences.filter(
            experience =>
                experience.cargo ||
                experience.empresa ||
                experience.descricao
        );


    if (!validExperiences.length) {

        container.innerHTML = `
            <p class="resume-empty">
                Suas experiências aparecerão aqui.
            </p>
        `;

        return;
    }


    container.innerHTML =
        validExperiences
            .map(
                experience => `

                <div class="resume-experience">

                    <div class="resume-experience-head">

                        <div>

                            <h3>
                                ${escapeHtml(
                                    experience.cargo ||
                                    "Cargo"
                                )}
                            </h3>

                            <div class="resume-experience-company">
                                ${escapeHtml(
                                    experience.empresa ||
                                    "Empresa"
                                )}
                            </div>

                        </div>


                        ${
                            experience.periodo
                                ? `
                                    <span class="resume-experience-period">
                                        ${escapeHtml(
                                            experience.periodo
                                        )}
                                    </span>
                                `
                                : ""
                        }

                    </div>


                    ${
                        experience.descricao
                            ? `
                                <p class="resume-experience-description">
                                    ${escapeHtml(
                                        experience.descricao
                                    )}
                                </p>
                            `
                            : ""
                    }

                </div>

            `
            )
            .join("");

}


/* =========================================================
   EDUCATION PREVIEW
========================================================= */

function updateEducationPreview() {

    const data =
        getCurrentData();

    const container =
        document.getElementById(
            "previewEducation"
        );


    if (
        !data.curso &&
        !data.instituicao
    ) {

        container.innerHTML = `
            <p class="resume-empty">
                Sua formação aparecerá aqui.
            </p>
        `;

        return;
    }


    container.innerHTML = `

        <div class="resume-education-item">

            <div class="resume-education-course">
                ${escapeHtml(
                    data.curso ||
                    "Curso"
                )}
            </div>

            <div class="resume-education-school">
                ${escapeHtml(
                    data.instituicao ||
                    "Instituição"
                )}
            </div>

            <div class="resume-education-status">

                ${
                    data.situacao
                        ? escapeHtml(
                            data.situacao
                        )
                        : ""
                }

                ${
                    data.semestre
                        ? ` • ${escapeHtml(
                            data.semestre
                        )}`
                        : ""
                }

            </div>

        </div>

    `;

}


/* =========================================================
   SKILLS PREVIEW
========================================================= */

function updateSkillsPreview() {

    const container =
        document.getElementById(
            "previewSkills"
        );


    if (!skills.length) {

        container.innerHTML = `
            <span class="resume-empty">
                Suas habilidades aparecerão aqui.
            </span>
        `;

        return;
    }


    container.innerHTML =
        skills
            .map(
                skill => `

                    <span class="resume-skill">
                        ${escapeHtml(skill)}
                    </span>

                `
            )
            .join("");

}


/* =========================================================
   PRINT
========================================================= */

function printResume() {

    updatePreview();

    setTimeout(
        () => {
            window.print();
        },
        100
    );

}


/* =========================================================
   MOBILE PREVIEW
========================================================= */

function openPreview() {

    previewPanel.classList.add(
        "mobile-open"
    );

}


function closePreview() {

    previewPanel.classList.remove(
        "mobile-open"
    );

}


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    toast.querySelector("p")
        .textContent =
        message;

    toast.classList.add("show");

    clearTimeout(
        window.toastTimer
    );

    window.toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =========================================================
   SECURITY / HTML ESCAPE
========================================================= */

function escapeHtml(value) {

    return String(value || "")
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   GLOBAL FUNCTIONS
   Needed by dynamically generated HTML
========================================================= */

window.removeExperience =
    removeExperience;

window.updateExperience =
    updateExperience;

window.removeSkill =
    removeSkill;