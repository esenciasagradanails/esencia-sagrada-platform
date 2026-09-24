import React, { useEffect, useReducer, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, Search } from 'lucide-react';
import { supabase } from '../../../core/services/supabaseClient';
import { useAuth } from '../../../core/hooks/useAuth';
import type { LeadFormValues } from '../../../core/models/lead.types';
import CustomSelect from '../../components/ui/CustomSelect/CustomSelect';

// ─── Types ────────────────────────────────────────────────────────────────────

interface LeadRow extends LeadFormValues {
 created_at: string;
 id: string;
}

// ─── Fetch reducer ────────────────────────────────────────────────────────────

interface FetchState {
 error: string | null;
 isLoading: boolean;
 leads: LeadRow[];
}

type FetchAction = { type: 'FETCH_START' } | { leads: LeadRow[]; type: 'FETCH_SUCCESS' } | { error: string; type: 'FETCH_ERROR' };

function fetchReducer(state: FetchState, action: FetchAction): FetchState {
 switch (action.type) {
  case 'FETCH_START':
   return { ...state, error: null, isLoading: true };
  case 'FETCH_SUCCESS':
   return { error: null, isLoading: false, leads: action.leads };
  case 'FETCH_ERROR':
   return { ...state, error: action.error, isLoading: false };
  default:
   return state;
 }
}

// ─── Lead Detail Modal ────────────────────────────────────────────────────────

interface LeadDetailModalProps {
 lead: LeadRow | null;
 onClose: () => void;
}

const LeadDetailModal: React.FC<LeadDetailModalProps> = ({ lead, onClose }) => {
 const backdropRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
   if (e.key === 'Escape') onClose();
  };
  if (lead) document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
 }, [lead, onClose]);

 useEffect(() => {
  document.body.style.overflow = lead ? 'hidden' : '';
  return () => {
   document.body.style.overflow = '';
  };
 }, [lead]);

 const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('es-MX', {
   day: '2-digit',
   month: 'long',
   year: 'numeric',
   hour: '2-digit',
   minute: '2-digit',
  });

 const LABEL_MAP: Record<string, string> = {
  email: 'Correo electrónico',
  current_experience: 'Experiencia actual',
  experience_time: 'Tiempo de experiencia',
  work_modality: 'Modalidad de trabajo',
  main_objective: 'Objetivo principal',
  topic_of_interest: 'Tema de interés',
  willing_to_invest: 'Dispuesta a invertir',
  wpp_group_joined: 'Grupo de WhatsApp',
 };

 const EXTRA_FIELDS = Object.keys(LABEL_MAP) as (keyof LeadRow)[];

 return (
  <AnimatePresence>
   {lead && (
    <motion.div
     ref={backdropRef}
     className='ldm-backdrop'
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     exit={{ opacity: 0 }}
     transition={{ duration: 0.2 }}
     onClick={(e) => {
      if (e.target === backdropRef.current) onClose();
     }}
     role='dialog'
     aria-modal='true'
     aria-label='Detalles del lead'
    >
     <motion.div
      className='ldm-card'
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.25, delay: 0.05, ease: 'easeOut' as const }}
     >
      {/* Header */}
      <div className='ldm-header'>
       <div>
        <p className='ldm-headerDate'>{formatDate(lead.created_at)}</p>
        <h2 className='ldm-headerName'>{lead.full_name}</h2>
        <p className='ldm-headerPhone'>{lead.whatsapp_number}</p>
       </div>
       <button className='ldm-closeBtn' type='button' onClick={onClose} aria-label='Cerrar'>
        <X size={18} />
       </button>
      </div>

      {/* Fields */}
      <div className='ldm-body'>
       {EXTRA_FIELDS.map((key) => {
        const raw = lead[key];
        const val = typeof raw === 'boolean' ? (raw ? '✅ Sí' : '❌ No') : String(raw ?? '—');
        return (
         <div className='ldm-field' key={key}>
          <span className='ldm-fieldLabel'>{LABEL_MAP[key]}</span>
          <span className='ldm-fieldValue'>{val}</span>
         </div>
        );
       })}
      </div>
     </motion.div>
    </motion.div>
   )}
  </AnimatePresence>
 );
};

// ─── Dashboard View ───────────────────────────────────────────────────────────

const DashboardView: React.FC = () => {
 const { user } = useAuth();
 const [fetchState, dispatch] = useReducer(fetchReducer, {
  error: null,
  isLoading: true,
  leads: [],
 });
 const [selectedLead, setSelectedLead] = useState<LeadRow | null>(null);

 // Filter states
 const [searchTerm, setSearchTerm] = useState('');
 const [filterExperience, setFilterExperience] = useState('all');
 const [filterWpp, setFilterWpp] = useState('all');

 useEffect(() => {
  dispatch({ type: 'FETCH_START' });
  supabase
   .from('masterclass_leads')
   .select('*')
   .order('created_at', { ascending: false })
   .then(({ data, error }) => {
    if (error) {
     dispatch({ error: error.message, type: 'FETCH_ERROR' });
    } else {
     dispatch({ leads: (data ?? []) as LeadRow[], type: 'FETCH_SUCCESS' });
    }
   });
 }, []);

 const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('es-MX', {
   day: '2-digit',
   month: 'short',
   year: 'numeric',
  });

 const filteredLeads = fetchState.leads.filter((lead) => {
  const searchLower = searchTerm.toLowerCase();
  const matchesSearch =
   searchTerm === '' || lead.full_name.toLowerCase().includes(searchLower) || lead.whatsapp_number.includes(searchTerm);

  const matchesExp = filterExperience === 'all' || lead.current_experience === filterExperience;

  const matchesWpp =
   filterWpp === 'all' || (filterWpp === 'yes' && lead.wpp_group_joined) || (filterWpp === 'no' && !lead.wpp_group_joined);

  return matchesSearch && matchesExp && matchesWpp;
 });

 const name = user?.user_metadata?.name || 'Dayana';

 return (
  <>
   <motion.div
    className='dv-page'
    style={{ paddingTop: '80px' }}
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
   >
    {/* ── Main ── */}
    <main className='dv-main'>
     <motion.div
      className='dv-banner'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
     >
      <h2>¡Hola, {name}! 👋</h2>
      <p>Estos son los prospectos que se han registrado recientemente.</p>
     </motion.div>

     <motion.div
      className='dv-topBar'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
     >
      <h1 className='dv-pageTitle'>Leads de Masterclass</h1>
      <p className='dv-pageSubtitle'>
       {fetchState.isLoading
        ? 'Cargando registros…'
        : `${filteredLeads.length} prospectos filtrados (de ${fetchState.leads.length} totales)`}
      </p>
     </motion.div>

     {/* ── Filters ── */}
     <motion.div
      className='dv-filters'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25, ease: 'easeOut' }}
     >
      <div className='dv-searchBox'>
       <Search className='dv-searchIcon' size={18} />
       <input
        type='text'
        className='dv-searchInput'
        placeholder='Buscar por nombre o teléfono...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
       />
      </div>

      <div className='dv-filterGroup'>
       <CustomSelect
        id='filter-exp'
        label='Experiencia'
        value={filterExperience}
        onChange={(e) => setFilterExperience(e.target.value)}
        options={[
         { label: 'Todos', value: 'all' },
         { label: 'Sin experiencia', value: 'sin_experiencia' },
         { label: 'Principiante', value: 'principiante' },
         { label: 'Intermedio', value: 'intermedio' },
         { label: 'Avanzado', value: 'avanzado' },
        ]}
       />
       <CustomSelect
        id='filter-wpp'
        label='Grupo WPP'
        value={filterWpp}
        onChange={(e) => setFilterWpp(e.target.value)}
        options={[
         { label: 'Todos', value: 'all' },
         { label: 'Sí unidos', value: 'yes' },
         { label: 'No unidos', value: 'no' },
        ]}
       />
      </div>
     </motion.div>

     {fetchState.error && (
      <div className='dv-errorBanner' role='alert'>
       Error al cargar: {fetchState.error}
      </div>
     )}

     {fetchState.isLoading && (
      <div className='dv-loadingContainer' aria-label='Cargando'>
       <span className='dv-loadingSpinner' />
      </div>
     )}

     {!fetchState.isLoading && !fetchState.error && (
      <motion.div
       className='dv-tableWrapper'
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
      >
       <table className='dv-table'>
        <thead>
         <tr>
          <th className='dv-th'>Fecha</th>
          <th className='dv-th'>Nombre</th>
          <th className='dv-th'>WhatsApp</th>
          <th className='dv-th'>Experiencia</th>
          <th className='dv-th'>Grupo WPP</th>
          <th className='dv-th'></th>
         </tr>
        </thead>
        <tbody>
         {filteredLeads.length === 0 ? (
          <tr>
           <td className='dv-emptyCell' colSpan={6}>
            No hay leads que coincidan con los filtros.
           </td>
          </tr>
         ) : (
          filteredLeads.map((lead) => (
           <tr className='dv-tr' key={lead.id}>
            <td className='dv-td'>{formatDate(lead.created_at)}</td>
            <td className='dv-td dv-tdBold'>{lead.full_name}</td>
            <td className='dv-td'>{lead.whatsapp_number}</td>
            <td className='dv-td'>{lead.current_experience}</td>
            <td className='dv-td'>
             <span className={['dv-badge', lead.wpp_group_joined ? 'dv-badgeYes' : 'dv-badgeNo'].join(' ')}>
              {lead.wpp_group_joined ? 'Sí' : 'No'}
             </span>
            </td>
            <td className='dv-td'>
             <button type='button' className='dv-viewMoreBtn' onClick={() => setSelectedLead(lead)}>
              <ChevronDown size={14} />
              Ver más
             </button>
            </td>
           </tr>
          ))
         )}
        </tbody>
       </table>
      </motion.div>
     )}
    </main>
   </motion.div>

   {/* Detail modal */}
   <LeadDetailModal lead={selectedLead} onClose={() => setSelectedLead(null)} />
  </>
 );
};

export default DashboardView;
