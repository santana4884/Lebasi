// =================================================================
// SCRIPT DE GUARDA - auth-guard.js
// =================================================================

// Este objeto global guardará o estado de autenticação e
// permitirá que os outros scripts (index.js, organizador.js)
// esperem pela autenticação antes de rodar.
const authGuard = {
    // A função `onAuthReady` aceita uma função (callback) como argumento.
    // O callback (que será o código principal da sua página) só será
    // executado DEPOIS que o Firebase verificar se o usuário está logado.
    onAuthReady: (callback) => {
        
        // =================================================================
        // COLE A *MESMA* CONFIGURAÇÃO DO SEU FIREBASE AQUI
        // =================================================================
        const firebaseConfig = {
             apiKey: "AIzaSyAtNP_9aD3xv1BZZGjFYfSBH7-8Ui085Lo",
             authDomain: "meu-kanban-pedidos.firebaseapp.com",
             projectId: "meu-kanban-pedidos",
             storageBucket: "meu-kanban-pedidos.firebasestorage.app",
             messagingSenderId: "781917748477",
             appId: "1:781917748477:web:9b2c1effa1bd54b4321294",
             measurementId: "G-X2CWKJWZ2H"
        };

        // Inicializa o Firebase
        try {
            firebase.initializeApp(firebaseConfig);
        } catch (e) {
            console.warn("Firebase App já inicializado.", e.message);
        }
        
        const auth = firebase.auth();

        // Esta é a verificação principal.
        // `onAuthStateChanged` é chamado uma vez na carga da página.
        auth.onAuthStateChanged(user => {
            if (user) {
                // --- USUÁRIO ESTÁ LOGADO ---
                
                // 1. Armazena o ID do usuário (userId) globalmente
                // para que o app principal (index.js) possa usá-lo.
                window.currentUserId = user.uid;
                window.currentUserEmail = user.email;

                // 2. Chama a função de callback, passando o usuário.
                // Isso "libera" o app principal para rodar.
                callback(user);
                
            } else {
                // --- USUÁRIO NÃO ESTÁ LOGADO ---
                
                // 1. Chuta o usuário de volta para a tela de login.
                console.warn("Usuário não logado. Redirecionando para login.html");
                window.location.href = 'login.html';
            }
        });
    }
};