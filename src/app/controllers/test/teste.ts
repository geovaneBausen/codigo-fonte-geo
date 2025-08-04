/**
 * Arquivo de teste para verificar se os dados da API Rick & Morty estão chegando corretamente
 * Execute este arquivo no console do navegador ou como um script Node.js

class APITester {
  constructor() {
    this.baseUrl = 'https://rickandmortyapi.com/api';
    this.results = {
      characters: null,
      episodes: null,
      locations: null,
      errors: []
    };
  }

  // Método para logs coloridos no console
  log(type, message, data = null) {
    const timestamp = new Date().toLocaleTimeString();
    const colors = {
      info: 'color: #2196F3',
      success: 'color: #4CAF50',
      warning: 'color: #FF9800',
      error: 'color: #F44336',
      test: 'color: #9C27B0; font-weight: bold'
    };

    console.log(`%c[${timestamp}] ${message}`, colors[type] || '');
    if (data) {
      console.log(data);
    }
  }

  // Teste 1: Verificar se a API está online
  async testAPIConnection() {
    this.log('test', '🌐 TESTE 1: Verificando conexão com a API...');
    
    try {
      const response = await fetch(`${this.baseUrl}/character/1`);
      
      if (response.ok) {
        this.log('success', '✅ API está online e respondendo');
        return true;
      } else {
        this.log('error', `❌ API retornou status: ${response.status}`);
        return false;
      }
    } catch (error) {
      this.log('error', '❌ Erro de conexão com a API:', error.message);
      this.results.errors.push(`Conexão: ${error.message}`);
      return false;
    }
  }

  // Teste 2: Buscar lista de personagens
  async testCharactersList() {
    this.log('test', '👥 TESTE 2: Buscando lista de personagens...');
    
    try {
      const response = await fetch(`${this.baseUrl}/character`);
      const data = await response.json();
      
      this.log('info', 'Response Status:', response.status);
      this.log('info', 'Headers:', Object.fromEntries(response.headers.entries()));
      
      if (data.results && Array.isArray(data.results)) {
        this.results.characters = data;
        
        this.log('success', '✅ Lista de personagens recebida com sucesso!');
        this.log('info', 'Informações da resposta:', {
          total: data.info?.count,
          páginas: data.info?.pages,
          próxima: data.info?.next,
          anterior: data.info?.prev,
          personagensNaPágina: data.results.length
        });
        
        this.log('info', 'Primeiros 3 personagens:', 
          data.results.slice(0, 3).map(char => ({
            id: char.id,
            nome: char.name,
            status: char.status,
            espécie: char.species
          }))
        );
        
        return true;
      } else {
        this.log('error', '❌ Formato de dados inválido');
        return false;
      }
    } catch (error) {
      this.log('error', '❌ Erro ao buscar personagens:', error.message);
      this.results.errors.push(`Personagens: ${error.message}`);
      return false;
    }
  }

  // Teste 3: Buscar personagem específico
  async testSpecificCharacter(id = 1) {
    this.log('test', `👤 TESTE 3: Buscando personagem específico (ID: ${id})...`);
    
    try {
      const response = await fetch(`${this.baseUrl}/character/${id}`);
      const character = await response.json();
      
      if (character.id) {
        this.log('success', '✅ Personagem específico encontrado!');
        this.log('info', 'Dados do personagem:', {
          id: character.id,
          nome: character.name,
          status: character.status,
          espécie: character.species,
          tipo: character.type,
          gênero: character.gender,
          origem: character.origin?.name,
          localização: character.location?.name,
          episódios: character.episode?.length
        });
        
        return character;
      } else {
        this.log('error', '❌ Personagem não encontrado');
        return null;
      }
    } catch (error) {
      this.log('error', '❌ Erro ao buscar personagem específico:', error.message);
      this.results.errors.push(`Personagem específico: ${error.message}`);
      return null;
    }
  }

  // Teste 4: Buscar episódios
  async testEpisodes() {
    this.log('test', '📺 TESTE 4: Buscando episódios...');
    
    try {
      const response = await fetch(`${this.baseUrl}/episode`);
      const data = await response.json();
      
      if (data.results && Array.isArray(data.results)) {
        this.results.episodes = data;
        
        this.log('success', '✅ Lista de episódios recebida!');
        this.log('info', 'Informações dos episódios:', {
          total: data.info?.count,
          páginas: data.info?.pages,
          episódiosNaPágina: data.results.length
        });
        
        this.log('info', 'Primeiros 3 episódios:', 
          data.results.slice(0, 3).map(ep => ({
            id: ep.id,
            nome: ep.name,
            episódio: ep.episode,
            data: ep.air_date
          }))
        );
        
        return true;
      } else {
        this.log('error', '❌ Formato de dados de episódios inválido');
        return false;
      }
    } catch (error) {
      this.log('error', '❌ Erro ao buscar episódios:', error.message);
      this.results.errors.push(`Episódios: ${error.message}`);
      return false;
    }
  }

  // Teste 5: Buscar localizações
  async testLocations() {
    this.log('test', '🌍 TESTE 5: Buscando localizações...');
    
    try {
      const response = await fetch(`${this.baseUrl}/location`);
      const data = await response.json();
      
      if (data.results && Array.isArray(data.results)) {
        this.results.locations = data;
        
        this.log('success', '✅ Lista de localizações recebida!');
        this.log('info', 'Informações das localizações:', {
          total: data.info?.count,
          páginas: data.info?.pages,
          localizaçõesNaPágina: data.results.length
        });
        
        return true;
      } else {
        this.log('error', '❌ Formato de dados de localizações inválido');
        return false;
      }
    } catch (error) {
      this.log('error', '❌ Erro ao buscar localizações:', error.message);
      this.results.errors.push(`Localizações: ${error.message}`);
      return false;
    }
  }

  // Teste 6: Verificar performance
  async testPerformance() {
    this.log('test', '⚡ TESTE 6: Verificando performance...');
    
    const startTime = performance.now();
    
    try {
      const response = await fetch(`${this.baseUrl}/character?page=1`);
      const data = await response.json();
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      this.log('success', `✅ Requisição completada em ${duration.toFixed(2)}ms`);
      
      if (duration < 1000) {
        this.log('success', '🚀 Performance excelente! (< 1s)');
      } else if (duration < 3000) {
        this.log('warning', '⚠️ Performance aceitável (1-3s)');
      } else {
        this.log('error', '🐌 Performance ruim (> 3s)');
      }
      
      return duration;
    } catch (error) {
      this.log('error', '❌ Erro no teste de performance:', error.message);
      return null;
    }
  }

  // Executar todos os testes
  async runAllTests() {
    console.clear();
    this.log('test', '🚀 INICIANDO BATERIA DE TESTES DA API RICK & MORTY');
    console.log('='.repeat(60));
    
    const tests = [
      this.testAPIConnection(),
      this.testCharactersList(),
      this.testSpecificCharacter(1),
      this.testSpecificCharacter(2),
      this.testEpisodes(),
      this.testLocations(),
      this.testPerformance()
    ];
    
    try {
      const results = await Promise.allSettled(tests);
      
      console.log('='.repeat(60));
      this.log('test', '📊 RESUMO DOS TESTES:');
      
      const passed = results.filter(r => r.status === 'fulfilled' && r.value).length;
      const total = results.length;
      
      this.log('info', `✅ Testes passaram: ${passed}/${total}`);
      
      if (this.results.errors.length > 0) {
        this.log('error', '❌ Erros encontrados:');
        this.results.errors.forEach(error => {
          console.log(`  • ${error}`);
        });
      }
      
      // Dados para uso posterior
      this.log('info', '💾 Dados salvos em window.apiTestResults:');
      window.apiTestResults = this.results;
      console.log(this.results);
      
    } catch (error) {
      this.log('error', '❌ Erro fatal durante os testes:', error.message);
    }
  }

  // Teste rápido para desenvolvimento
  async quickTest() {
    this.log('test', '⚡ TESTE RÁPIDO');
    
    try {
      const response = await fetch(`${this.baseUrl}/character?page=1`);
      const data = await response.json();
      
      this.log('success', '✅ API funcionando!');
      this.log('info', 'Dados recebidos:', {
        personagens: data.results?.length,
        total: data.info?.count,
        primeiro: data.results?.[0]?.name
      });
      
      return data;
    } catch (error) {
      this.log('error', '❌ Erro no teste rápido:', error.message);
      return null;
    }
  }
}

// Instância global para uso no console
window.apiTester = new APITester();

// Funções convenientes para o console
window.testAPI = () => window.apiTester.runAllTests();
window.quickTest = () => window.apiTester.quickTest();

// Auto-executar se chamado diretamente
if (typeof window !== 'undefined') {
  console.log('%c🧪 TESTADOR DA API RICK & MORTY CARREGADO!', 'color: #00ff00; font-size: 16px; font-weight: bold;');
  console.log('%cUse os comandos:', 'color: #ffff00; font-weight: bold;');
  console.log('%c  testAPI()    - Executar todos os testes', 'color: #cyan;');
  console.log('%c  quickTest()  - Teste rápido', 'color: #cyan;');
  console.log('%c  apiTester.testCharactersList() - Teste específico', 'color: #cyan;');
}

export default APITester;
 */