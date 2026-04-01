/**
 * Translation system for the EMS application
 */

export interface Translations {
  // Common
  common: {
    save: string
    cancel: string
    delete: string
    edit: string
    create: string
    search: string
    loading: string
    error: string
    success: string
    close: string
  }
  
  // Navigation
  nav: {
    dashboard: string
    courses: string
    resources: string
    lectures: string
    assignments: string
    progress: string
    chat: string
    calendar: string
    students: string
    settings: string
  }
  
  // Dashboard
  dashboard: {
    welcome: string
    welcomeBack: string
    totalCourses: string
    totalStudents: string
    pendingAssignments: string
    completedCourses: string
    averageScore: string
    recentActivity: string
    upcomingDeadlines: string
  }
  
  // Settings
  settings: {
    themeMode: string
    language: string
    selectTheme: string
    selectLanguage: string
    searchLanguages: string
    languageSaved: string
    saveLanguage: string
    teacherPortal: string
    studentPortal: string
  }
  
  // Roles
  roles: {
    teacher: string
    student: string
  }
}

const translations: Record<string, Translations> = {
  en: {
    common: {
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      create: 'Create',
      search: 'Search',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      close: 'Close',
    },
    nav: {
      dashboard: 'Dashboard',
      courses: 'Courses',
      resources: 'Resources',
      lectures: 'Lectures',
      assignments: 'Assignments',
      progress: 'Progress',
      chat: 'Chat',
      calendar: 'Calendar',
      students: 'Students',
      settings: 'Settings',
    },
    dashboard: {
      welcome: 'Welcome',
      welcomeBack: 'Welcome back',
      totalCourses: 'Total Courses',
      totalStudents: 'Total Students',
      totalTeachers: 'Total Teachers',
      pendingAssignments: 'Pending Assignments',
      completedCourses: 'Completed Courses',
      averageScore: 'Average Score',
      recentActivity: 'Recent Activity',
      upcomingDeadlines: 'Upcoming Deadlines',
    },
    settings: {
      themeMode: 'Theme Mode',
      language: 'Language',
      selectTheme: 'Select a preset theme to quickly apply a complete color scheme.',
      selectLanguage: 'Select your preferred language for the interface. Changes will be applied after saving.',
      searchLanguages: 'Search languages...',
      languageSaved: 'Language saved successfully!',
      saveLanguage: 'Save Language',
      teacherPortal: 'Teacher Portal',
      studentPortal: 'Student Portal',
    },
    roles: {
      teacher: 'Teacher',
      student: 'Student',
    },
  },
  vi: {
    common: {
      save: 'Lưu',
      cancel: 'Hủy',
      delete: 'Xóa',
      edit: 'Chỉnh sửa',
      create: 'Tạo mới',
      search: 'Tìm kiếm',
      loading: 'Đang tải...',
      error: 'Lỗi',
      success: 'Thành công',
      close: 'Đóng',
    },
    nav: {
      dashboard: 'Bảng điều khiển',
      courses: 'Khóa học',
      resources: 'Tài nguyên',
      lectures: 'Bài giảng',
      assignments: 'Bài tập',
      progress: 'Tiến độ',
      chat: 'Trò chuyện',
      calendar: 'Lịch',
      users: 'Người dùng',
      settings: 'Cài đặt',
    },
    dashboard: {
      welcome: 'Chào mừng',
      welcomeBack: 'Chào mừng trở lại',
      totalCourses: 'Tổng số khóa học',
      totalStudents: 'Tổng số học sinh',
      totalTeachers: 'Tổng số giáo viên',
      pendingAssignments: 'Bài tập đang chờ',
      completedCourses: 'Khóa học đã hoàn thành',
      averageScore: 'Điểm trung bình',
      recentActivity: 'Hoạt động gần đây',
      upcomingDeadlines: 'Hạn chót sắp tới',
    },
    settings: {
      themeMode: 'Chế độ giao diện',
      language: 'Ngôn ngữ',
      selectTheme: 'Chọn một giao diện có sẵn để áp dụng nhanh bộ màu hoàn chỉnh.',
      selectLanguage: 'Chọn ngôn ngữ ưa thích của bạn cho giao diện. Thay đổi sẽ được áp dụng sau khi lưu.',
      searchLanguages: 'Tìm kiếm ngôn ngữ...',
      languageSaved: 'Đã lưu ngôn ngữ thành công!',
      saveLanguage: 'Lưu ngôn ngữ',
      adminDashboard: 'Bảng điều khiển quản trị',
      teacherPortal: 'Cổng giáo viên',
      studentPortal: 'Cổng học sinh',
    },
    roles: {
      admin: 'Quản trị viên',
      teacher: 'Giáo viên',
      student: 'Học sinh',
    },
  },
  es: {
    common: {
      save: 'Guardar',
      cancel: 'Cancelar',
      delete: 'Eliminar',
      edit: 'Editar',
      create: 'Crear',
      search: 'Buscar',
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
      close: 'Cerrar',
    },
    nav: {
      dashboard: 'Panel',
      courses: 'Cursos',
      resources: 'Recursos',
      lectures: 'Conferencias',
      assignments: 'Tareas',
      progress: 'Progreso',
      chat: 'Chat',
      calendar: 'Calendario',
      users: 'Usuarios',
      settings: 'Configuración',
    },
    dashboard: {
      welcome: 'Bienvenido',
      welcomeBack: 'Bienvenido de nuevo',
      totalCourses: 'Total de Cursos',
      totalStudents: 'Total de Estudiantes',
      totalTeachers: 'Total de Profesores',
      pendingAssignments: 'Tareas Pendientes',
      completedCourses: 'Cursos Completados',
      averageScore: 'Puntuación Promedio',
      recentActivity: 'Actividad Reciente',
      upcomingDeadlines: 'Próximas Fechas Límite',
    },
    settings: {
      themeMode: 'Modo de Tema',
      language: 'Idioma',
      selectTheme: 'Selecciona un tema preestablecido para aplicar rápidamente un esquema de colores completo.',
      selectLanguage: 'Selecciona tu idioma preferido para la interfaz. Los cambios se aplicarán después de guardar.',
      searchLanguages: 'Buscar idiomas...',
      languageSaved: '¡Idioma guardado exitosamente!',
      saveLanguage: 'Guardar Idioma',
      adminDashboard: 'Panel de Administración',
      teacherPortal: 'Portal del Profesor',
      studentPortal: 'Portal del Estudiante',
    },
    roles: {
      admin: 'Administrador',
      teacher: 'Profesor',
      student: 'Estudiante',
    },
  },
  fr: {
    common: {
      save: 'Enregistrer',
      cancel: 'Annuler',
      delete: 'Supprimer',
      edit: 'Modifier',
      create: 'Créer',
      search: 'Rechercher',
      loading: 'Chargement...',
      error: 'Erreur',
      success: 'Succès',
      close: 'Fermer',
    },
    nav: {
      dashboard: 'Tableau de bord',
      courses: 'Cours',
      resources: 'Ressources',
      lectures: 'Conférences',
      assignments: 'Devoirs',
      progress: 'Progrès',
      chat: 'Chat',
      calendar: 'Calendrier',
      users: 'Utilisateurs',
      settings: 'Paramètres',
    },
    dashboard: {
      welcome: 'Bienvenue',
      welcomeBack: 'Bon retour',
      totalCourses: 'Total des Cours',
      totalStudents: 'Total des Étudiants',
      totalTeachers: 'Total des Enseignants',
      pendingAssignments: 'Devoirs en Attente',
      completedCourses: 'Cours Terminés',
      averageScore: 'Score Moyen',
      recentActivity: 'Activité Récente',
      upcomingDeadlines: 'Échéances à Venir',
    },
    settings: {
      themeMode: 'Mode Thème',
      language: 'Langue',
      selectTheme: 'Sélectionnez un thème prédéfini pour appliquer rapidement un schéma de couleurs complet.',
      selectLanguage: 'Sélectionnez votre langue préférée pour l\'interface. Les modifications seront appliquées après l\'enregistrement.',
      searchLanguages: 'Rechercher des langues...',
      languageSaved: 'Langue enregistrée avec succès!',
      saveLanguage: 'Enregistrer la Langue',
      adminDashboard: 'Tableau de bord Admin',
      teacherPortal: 'Portail Enseignant',
      studentPortal: 'Portail Étudiant',
    },
    roles: {
      admin: 'Administrateur',
      teacher: 'Enseignant',
      student: 'Étudiant',
    },
  },
  de: {
    common: {
      save: 'Speichern',
      cancel: 'Abbrechen',
      delete: 'Löschen',
      edit: 'Bearbeiten',
      create: 'Erstellen',
      search: 'Suchen',
      loading: 'Laden...',
      error: 'Fehler',
      success: 'Erfolg',
      close: 'Schließen',
    },
    nav: {
      dashboard: 'Dashboard',
      courses: 'Kurse',
      resources: 'Ressourcen',
      lectures: 'Vorlesungen',
      assignments: 'Aufgaben',
      progress: 'Fortschritt',
      chat: 'Chat',
      calendar: 'Kalender',
      users: 'Benutzer',
      settings: 'Einstellungen',
    },
    dashboard: {
      welcome: 'Willkommen',
      welcomeBack: 'Willkommen zurück',
      totalCourses: 'Gesamtkurse',
      totalStudents: 'Gesamtstudenten',
      totalTeachers: 'Gesamtlehrer',
      pendingAssignments: 'Ausstehende Aufgaben',
      completedCourses: 'Abgeschlossene Kurse',
      averageScore: 'Durchschnittsnote',
      recentActivity: 'Letzte Aktivität',
      upcomingDeadlines: 'Bevorstehende Fristen',
    },
    settings: {
      themeMode: 'Themenmodus',
      language: 'Sprache',
      selectTheme: 'Wählen Sie ein voreingestelltes Thema aus, um schnell ein vollständiges Farbschema anzuwenden.',
      selectLanguage: 'Wählen Sie Ihre bevorzugte Sprache für die Benutzeroberfläche. Änderungen werden nach dem Speichern übernommen.',
      searchLanguages: 'Sprachen suchen...',
      languageSaved: 'Sprache erfolgreich gespeichert!',
      saveLanguage: 'Sprache speichern',
      adminDashboard: 'Admin-Dashboard',
      teacherPortal: 'Lehrer-Portal',
      studentPortal: 'Studenten-Portal',
    },
    roles: {
      admin: 'Administrator',
      teacher: 'Lehrer',
      student: 'Student',
    },
  },
  zh: {
    common: {
      save: '保存',
      cancel: '取消',
      delete: '删除',
      edit: '编辑',
      create: '创建',
      search: '搜索',
      loading: '加载中...',
      error: '错误',
      success: '成功',
      close: '关闭',
    },
    nav: {
      dashboard: '仪表板',
      courses: '课程',
      resources: '资源',
      lectures: '讲座',
      assignments: '作业',
      progress: '进度',
      chat: '聊天',
      calendar: '日历',
      users: '用户',
      settings: '设置',
    },
    dashboard: {
      welcome: '欢迎',
      welcomeBack: '欢迎回来',
      totalCourses: '总课程数',
      totalStudents: '总学生数',
      totalTeachers: '总教师数',
      pendingAssignments: '待处理作业',
      completedCourses: '已完成课程',
      averageScore: '平均分数',
      recentActivity: '最近活动',
      upcomingDeadlines: '即将到来的截止日期',
    },
    settings: {
      themeMode: '主题模式',
      language: '语言',
      selectTheme: '选择一个预设主题以快速应用完整的配色方案。',
      selectLanguage: '选择您喜欢的界面语言。更改将在保存后应用。',
      searchLanguages: '搜索语言...',
      languageSaved: '语言保存成功！',
      saveLanguage: '保存语言',
      adminDashboard: '管理仪表板',
      teacherPortal: '教师门户',
      studentPortal: '学生门户',
    },
    roles: {
      admin: '管理员',
      teacher: '教师',
      student: '学生',
    },
  },
  ja: {
    common: {
      save: '保存',
      cancel: 'キャンセル',
      delete: '削除',
      edit: '編集',
      create: '作成',
      search: '検索',
      loading: '読み込み中...',
      error: 'エラー',
      success: '成功',
      close: '閉じる',
    },
    nav: {
      dashboard: 'ダッシュボード',
      courses: 'コース',
      resources: 'リソース',
      lectures: '講義',
      assignments: '課題',
      progress: '進捗',
      chat: 'チャット',
      calendar: 'カレンダー',
      users: 'ユーザー',
      settings: '設定',
    },
    dashboard: {
      welcome: 'ようこそ',
      welcomeBack: 'おかえりなさい',
      totalCourses: '総コース数',
      totalStudents: '総学生数',
      totalTeachers: '総教師数',
      pendingAssignments: '保留中の課題',
      completedCourses: '完了したコース',
      averageScore: '平均スコア',
      recentActivity: '最近の活動',
      upcomingDeadlines: '今後の締切',
    },
    settings: {
      themeMode: 'テーマモード',
      language: '言語',
      selectTheme: 'プリセットテーマを選択して、完全なカラースキームをすばやく適用します。',
      selectLanguage: 'インターフェースの希望言語を選択してください。変更は保存後に適用されます。',
      searchLanguages: '言語を検索...',
      languageSaved: '言語が正常に保存されました！',
      saveLanguage: '言語を保存',
      adminDashboard: '管理者ダッシュボード',
      teacherPortal: '教師ポータル',
      studentPortal: '学生ポータル',
    },
    roles: {
      admin: '管理者',
      teacher: '教師',
      student: '学生',
    },
  },
  ko: {
    common: {
      save: '저장',
      cancel: '취소',
      delete: '삭제',
      edit: '편집',
      create: '생성',
      search: '검색',
      loading: '로딩 중...',
      error: '오류',
      success: '성공',
      close: '닫기',
    },
    nav: {
      dashboard: '대시보드',
      courses: '강의',
      resources: '리소스',
      lectures: '강의',
      assignments: '과제',
      progress: '진행 상황',
      chat: '채팅',
      calendar: '캘린더',
      users: '사용자',
      settings: '설정',
    },
    dashboard: {
      welcome: '환영합니다',
      welcomeBack: '다시 오신 것을 환영합니다',
      totalCourses: '전체 강의',
      totalStudents: '전체 학생',
      totalTeachers: '전체 교사',
      pendingAssignments: '대기 중인 과제',
      completedCourses: '완료된 강의',
      averageScore: '평균 점수',
      recentActivity: '최근 활동',
      upcomingDeadlines: '다가오는 마감일',
    },
    settings: {
      themeMode: '테마 모드',
      language: '언어',
      selectTheme: '프리셋 테마를 선택하여 전체 색상 구성표를 빠르게 적용합니다.',
      selectLanguage: '인터페이스에 선호하는 언어를 선택하세요. 변경 사항은 저장 후 적용됩니다.',
      searchLanguages: '언어 검색...',
      languageSaved: '언어가 성공적으로 저장되었습니다!',
      saveLanguage: '언어 저장',
      adminDashboard: '관리자 대시보드',
      teacherPortal: '교사 포털',
      studentPortal: '학생 포털',
    },
    roles: {
      admin: '관리자',
      teacher: '교사',
      student: '학생',
    },
  },
}

// Default to English if language not found
export function getTranslations(language: string): Translations {
  return translations[language] || translations.en
}

export function useTranslation(language: string) {
  return getTranslations(language)
}
