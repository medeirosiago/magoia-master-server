
export interface NotionDatabaseResponse {
  object: string; // Tipo do objeto retornado, geralmente "list"
  results: NotionPage[]; // Lista de páginas ou itens do banco de dados
  next_cursor: string | null; // Ponteiro para a próxima página, se houver
  has_more: boolean; // Indica se há mais resultados
  type: string; // Tipo do banco de dados ou página
  page_or_database: Record<string, unknown>; // Representação genérica de conteúdo adicional
  request_id: string; // Identificador da requisição
}

export interface NotionPage {
  object: string; // Sempre "page" para itens do banco de dados
  id: string; // Identificador único da página
  created_time: string; // Data e hora de criação no formato ISO 8601
  last_edited_time: string; // Data e hora da última edição no formato ISO 8601
  created_by: NotionUser; // Informações do criador
  last_edited_by: NotionUser; // Informações do último editor
  cover: string | null; // URL ou nulo se não houver capa
  icon: string | null; // URL do ícone ou nulo
  parent: NotionParent; // Informações do pai
  archived: boolean; // Indica se a página está arquivada
  in_trash: boolean; // Indica se a página está na lixeira
  properties: Record<string, NotionProperty>; // Propriedades da página
  url: string; // URL pública da página
  public_url: string | null; // URL pública se houver compartilhamento ativado
}

export interface NotionUser {
  object: string; // Sempre "user"
  id: string; // Identificador único do usuário
}

export interface NotionParent {
  type: string; // Tipo do pai, geralmente "database_id"
  database_id: string; // Identificador do banco de dados pai
}

export type NotionProperty =
  | NotionDateProperty
  | NotionPeopleProperty
  | NotionStatusProperty
  | NotionUniqueIdProperty
  | NotionTitleProperty
  | NotionRichTextProperty;

export interface NotionDateProperty {
  type: "date"; // Propriedade discriminadora
  id: string;
  date: {
    start: string | null;
    end: string | null;
    time_zone: string | null;
  } | null;
}

export interface NotionUserDetails {
  object: string;
  id: string;
  name: string;
  avatar_url: string;
  type: string;
  person: any;
}
export interface NotionPeopleProperty {
  type: "people"; // Propriedade discriminadora
  id: string;
  people: NotionUserDetails[];
}

export interface NotionStatusProperty {
  type: "status"; // Propriedade discriminadora
  id: string;
  status: {
    id: string;
    name: string;
    color: string;
  } | null;
}

export interface NotionUniqueIdProperty {
  type: "unique_id"; // Propriedade discriminadora
  id: string;
  unique_id: {
    prefix: string | null;
    number: number;
  };
}

export interface NotionTitleProperty {
  type: "title"; // Propriedade discriminadora
  id: string;
  title: Array<{
    type: "text";
    text: {
      content: string;
      link: string | null;
    };
    annotations: {
      bold: boolean;
      italic: boolean;
      strikethrough: boolean;
      underline: boolean;
      code: boolean;
      color: string;
    };
    plain_text: string;
    href: string | null;
  }>;
}

export interface NotionRichTextProperty {
  type: "rich_text"; // Propriedade discriminadora
  id: string;
  rich_text: Array<{
    type: "text";
    text: {
      content: string;
      link: string | null;
    };
    annotations: {
      bold: boolean;
      italic: boolean;
      strikethrough: boolean;
      underline: boolean;
      code: boolean;
      color: string;
    };
    plain_text: string;
    href: string | null;
  }>;
}

export interface SimplifiedTask {
  id: string; // ID único da tarefa
  name: string; // Nome da tarefa
  description?: string; // Detalhes da tarefa (opcional)
  completed: boolean; // Indica se a tarefa está concluída
  dueDate?: string; // Data de conclusão (opcional)
  assignees: string[]; // Lista de pessoas atribuídas
}