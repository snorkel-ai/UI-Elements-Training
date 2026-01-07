import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('overview')

  return (
    <div className="app">
      <header className="header">
        <h1>UI Elements Training</h1>
        <p className="subtitle">Expert Contributor Guidelines</p>
        <nav className="page-nav">
          <button
            className={`nav-tab ${currentPage === 'overview' ? 'active' : ''}`}
            onClick={() => setCurrentPage('overview')}
          >
            Project Overview
          </button>
          <button
            className={`nav-tab ${currentPage === 'flow' ? 'active' : ''}`}
            onClick={() => setCurrentPage('flow')}
          >
            Conversation Flow
          </button>
          <button
            className={`nav-tab ${currentPage === 'checklist' ? 'active' : ''}`}
            onClick={() => setCurrentPage('checklist')}
          >
            Review Checklist
          </button>
          <button
            className={`nav-tab ${currentPage === 'example' ? 'active' : ''}`}
            onClick={() => setCurrentPage('example')}
          >
            Example
          </button>
        </nav>
      </header>

      <main className={`main-content ${currentPage === 'example' ? 'example-main' : ''}`}>
        {currentPage === 'overview' && <ProjectOverview />}
        {currentPage === 'flow' && <ConversationFlow />}
        {currentPage === 'checklist' && <ReviewChecklist />}
        {currentPage === 'example' && <ExampleComponents />}
      </main>
    </div>
  )
}

function ProjectOverview() {
  return (
    <div className="overview-page">
      <section className="content-section">
        <h2>Project Overview</h2>
        <div className="card">
          <p>
            This project is focused on creating a dataset of multi-turn conversations between a user and Assistant where the Assistant uses custom user interface (UI) elements to improve overall output.
          </p>
          <p>
            As Expert Contributors on this project, you will be evaluating and editing pre-generated conversations between a user and the Assistant to ensure they meet all the criteria outlined in the Review Checklist.
          </p>
        </div>

        <h3>Components of a Datapoint</h3>
        <p>Each datapoint in the dataset consists of three files:</p>
        <ul className="objectives-list">
          <li>
            <strong>conversation.json:</strong> Contains the conversation data including:
            <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
              <li><code>componentsSchema</code> - JSON schema defining all possible UI components and their properties</li>
              <li><code>conversation</code> - Array of conversation turns, where each turn contains:
                <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                  <li><strong>User Prompt</strong> (role: "user") - Contains the user's message content</li>
                  <li><strong>Grading Guidance</strong> - Separate field containing quality_criteria and expected_components for evaluating the turn</li>
                  <li><strong>Assistant Response with Tool Calls</strong> (role: "assistant", if applicable) - Contains toolCalls when the Assistant needs to perform an action or generate UI components</li>
                  <li><strong>Tool Outputs</strong> (role: "tool", if applicable) - Results from tool execution, containing tool_call_id and content</li>
                  <li><strong>Assistant Response</strong> (role: "assistant") - Contains content array with text and/or component objects, appearing after tool outputs when tools are used</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <strong>components.ts:</strong> TypeScript interface definitions for all UI components used in the conversation, providing type definitions that match the componentsSchema
          </li>
          <li>
            <strong>canvas.html:</strong> HTML file that renders the conversation visually, including all UI components in their rendered form for preview and validation
          </li>
        </ul>

        <h3>Key Review Areas</h3>
        <ul className="objectives-list">
          <li>
            <strong>Traceability:</strong> Ensuring all information, actions, and component content can be traced back to conversation context or tool outputs, with no hallucinated content.
          </li>
          <li>
            <strong>Tool Correctness:</strong> Verifying tools are properly defined, consistently used throughout the conversation, and appropriately applied (not used for tasks the model can do natively).
          </li>
          <li>
            <strong>Conversation Flow / Turn Logic:</strong> Ensuring the conversation follows logical sequences (UP → Assistant → Tool Call → Tool Output → Assistant Response) and proper message ordering.
          </li>
          <li>
            <strong>Component Sanity:</strong> Checking that components are non-interactive, generalizable, contextually grounded, and only present when relevant to the current turn.
          </li>
          <li>
            <strong>Grading Guidance / Expected Components:</strong> Verifying grading guidance is turn-specific and expected components are accurately described in natural language (or empty when appropriate).
          </li>
          <li>
            <strong>Assistant Response:</strong> Ensuring responses are accurate, don't make false claims about actions or content, properly reference tool outputs, and avoid placeholder data.
          </li>
          <li>
            <strong>UI Element Questions:</strong> A set of specific questions to evaluate each UI element's relevance, interactivity, tool call correspondence, schema matching, context grounding, and alignment with expected components.
          </li>
        </ul>

      </section>
    </div>
  )
}

function ConversationFlow() {
  return (
    <div className="overview-page">
      <section className="content-section">
        <h2>Conversation Flow</h2>
        <p>The conversation follows a structured flow:</p>
        <ol className="flow-list">
          <li className="flow-item">
            <strong>User Prompt</strong>
            <p>The initial request or question from the user</p>
          </li>
          <li className="flow-item">
            <strong>Grading Guidance</strong>
            <p>Specific criteria for evaluating the current turn</p>
          </li>
          <li className="flow-item">
            <strong>Tool Call (if applicable)</strong>
            <p>When the Assistant needs to perform an action or generate UI components</p>
          </li>
          <li className="flow-item">
            <strong>Tool Output (if applicable)</strong>
            <p>The result returned from the tool call</p>
          </li>
          <li className="flow-item">
            <strong>Assistant Response</strong>
            <p>The final response to the user - may contain UI components</p>
          </li>
        </ol>

        <div className="note-box">
          <strong>Important:</strong> There should always be an Assistant message directly following a tool call. 
          Users cannot see the tool messages, so we must ensure that the User is always responding to Assistant messages, not the tools.
        </div>
      </section>
    </div>
  )
}

function ReviewChecklist() {
  const [checkedItems, setCheckedItems] = useState({})
  const [expandedSections, setExpandedSections] = useState({
    "1": true,
    "2": true,
    "3": true,
    "4": true,
    "5": true,
    "6": true,
    "7": true
  })

  const toggleChecked = (itemId) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }))
  }

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const deselectSection = (sectionId, itemCount) => {
    setCheckedItems(prev => {
      const newChecked = { ...prev }
      for (let i = 0; i < itemCount; i++) {
        const itemId = `${sectionId}-${i}`
        delete newChecked[itemId]
      }
      return newChecked
    })
  }

  return (
    <div className="checklist-page">
      <ChecklistSection
        sectionId="1"
        checkedItems={checkedItems}
        toggleChecked={toggleChecked}
        isExpanded={expandedSections["1"]}
        toggleSection={toggleSection}
        deselectSection={deselectSection}
        title="1. Traceability"
        definition="Ensuring all information, actions, and component content can be traced back to conversation context or tool outputs, with no hallucinated content."
        items={[
          {
            check: "Every assistant action, claim, or component field is traceable to a user message, prior context, or a tool output",
            details: "No hallucinated data, files, entities, or side effects. All information must come from the conversation context."
          },
          {
            check: "Every action that requires a tool has a corresponding tool call",
            details: "If the assistant claims to have done something (e.g., 'I've uploaded a PDF', 'alerts are set up'), there must be a tool call that actually performs this action."
          },
          {
            check: "Component properties only appear after the User Prompt or context that populates them",
            details: "Component properties must be populated from prior context. Tool outputs to populate components must appear before components are called."
          },
          {
            check: "All component content is pulled from conversation context, prompts, responses, or tool calls (no hallucinated content)",
            details: "All component content must be pulled from conversation context, prompts, other responses, or tool calls. Exception: very minor/trivial and timeless knowledge."
          }
        ]}
      />

      <ChecklistSection
        sectionId="2"
        checkedItems={checkedItems}
        toggleChecked={toggleChecked}
        isExpanded={expandedSections["2"]}
        toggleSection={toggleSection}
        deselectSection={deselectSection}
        title="2. Tool Correctness"
        definition="Verifying tools are properly defined, consistently used throughout the conversation, and appropriately applied (not used for tasks the model can do natively)."
        items={[
          {
            check: "All tools used are clearly defined in the sample",
            details: "Tool definitions must be present and consistent. Same tool must maintain its same definition if used multiple times."
          },
          {
            check: "Tool definitions are consistent and used uniformly throughout",
            details: "Tools should have the same definition and arguments throughout the conversation."
          },
          {
            check: "Tools are not used for tasks the model can do natively",
            details: "No tools for formatting, parsing, or extracting data. Models can do this themselves. Tools should only be used for actions that require external capabilities."
          },
          {
            check: "Tool execution flags (e.g. tool_executed = true) are accurate",
            details: "Verify that tool_executed flags match actual tool usage."
          },
          {
            check: "Sequential tool calls appear in separate assistant messages",
            details: "If tool calls are in the same message, they run in parallel. Sequential calls must be in distinct messages so one can be based on the other's output."
          }
        ]}
      />

      <ChecklistSection
        sectionId="3"
        checkedItems={checkedItems}
        toggleChecked={toggleChecked}
        isExpanded={expandedSections["3"]}
        toggleSection={toggleSection}
        deselectSection={deselectSection}
        title="3. Conversation Flow / Turn Logic"
        definition="Ensuring the conversation follows logical sequences and proper message ordering."
        items={[
          {
            check: "Flow is logical: User Prompt → Grading Guidance → Tool Call (if applicable) → Tool Output (if applicable) → Assistant Response (may contain UI component)",
            details: "When tools are used, this sequence must be followed. No user message directly follows a tool output."
          },
          {
            check: "Assistant message always follows tool call",
            details: "Users cannot see tool messages. Tool responses must be followed by a summary or closing statement from the assistant. No empty assistant messages after tool responses."
          },
          {
            check: "Tool outputs appear before components that use them",
            details: "Any tool outputs needed to populate components must appear before the components are called."
          }
        ]}
      />

      <ChecklistSection
        sectionId="4"
        checkedItems={checkedItems}
        toggleChecked={toggleChecked}
        isExpanded={expandedSections["4"]}
        toggleSection={toggleSection}
        deselectSection={deselectSection}
        title="4. Component Sanity"
        definition="Verifying UI components are non-interactive, generalizable, properly grounded in conversation context, and only appear when relevant to the current turn."
        items={[
          {
            check: "The UI elements do not contain any elements that are or appear that they would be interactive",
            details: "No dropdowns, buttons, filters, or anything that appears interactive. Avoid buttons like 'create', 'edit' that expect immediate response."
          },
          {
            check: "Components are generalizable and not overfit to a single scenario",
            details: "Components should be reusable, not overly specific. Avoid unnecessary nesting or overly bespoke schemas."
          },
          {
            check: "Component content is grounded in prior conversation context",
            details: "All component properties must match the JSON in componentSchema and be pulled from conversation context."
          },
          {
            check: "Components are only present when relevant to the current turn",
            details: "UI elements should not appear before or after turns where they're necessary. Components should not be redundant if info is already in assistant response."
          },
          {
            check: "If a tool message generates a UI component, it must be followed by that component",
            details: "Tool calls that generate components must have the corresponding component appear immediately after."
          }
        ]}
      />

      <ChecklistSection
        sectionId="5"
        checkedItems={checkedItems}
        toggleChecked={toggleChecked}
        isExpanded={expandedSections["5"]}
        toggleSection={toggleSection}
        deselectSection={deselectSection}
        title="5. Grading Guidance / Expected Components"
        definition="Ensuring grading guidance is turn-specific, expected components are described in natural language, and they accurately match what's actually provided in the conversation."
        items={[
          {
            check: "Grading guidance is adapted per user turn, not for the whole conversation",
            details: "GG should be specific to the current turn only. If a clarifying question is expected, GG should reflect that."
          },
          {
            check: "Expected components are described in natural language (not strict lists)",
            details: "Use natural language to describe expected components. Can mention 'must haves', 'nice to haves', 'could haves'. Use exact component names."
          },
          {
            check: "Expected components are empty when none should appear",
            details: "For turns requiring clarifying questions or when no components are needed, expected_components should be empty. LLM tends to always include something - check this carefully."
          },
          {
            check: "Expected components match what's actually provided",
            details: "If expected components are listed, they must be used. Components shown must appear in Expected Components section."
          }
        ]}
      />

      <ChecklistSection
        sectionId="6"
        checkedItems={checkedItems}
        toggleChecked={toggleChecked}
        isExpanded={expandedSections["6"]}
        toggleSection={toggleSection}
        deselectSection={deselectSection}
        title="6. Assistant Response"
        definition="Verifying assistant responses contain no placeholder data or false claims, properly reference tool outputs and components, and avoid redundant information."
        items={[
          {
            check: "The assistant response contains no placeholder data (example@mail.com, website.com)",
            details: "Avoid placeholder names/emails or pre-generated entities. Use real or context-appropriate data."
          },
          {
            check: "The assistant response makes no false claims about actions or content",
            details: "Don't claim elements/data/features are present when they're not. Examples: 'I've attached a PDF below...' or 'alerts via email are now set up' without actual tool calls."
          },
          {
            check: "If a tool was called, response includes the UI components from the tool call",
            details: "Assistant response must include components that were generated by tool calls."
          },
          {
            check: "No redundant information between response and components",
            details: "If component contains info, assistant response doesn't need to repeat it, and vice versa."
          },
          {
            check: "Links have preceding web search when needed",
            details: "If link URL could have changed in past year or is obscure, need web search tool call. Basic sites (Spotify.com) don't need tool calls."
          },
          {
            check: "Actions are reasonable and have associated tool calls",
            details: "Drafting emails is fine, but not sending them. Every claimed action must have a tool call. Make sure scenarios don't require file attachments."
          }
        ]}
      />

      <ChecklistSection
        sectionId="7"
        checkedItems={checkedItems}
        toggleChecked={toggleChecked}
        isExpanded={expandedSections["7"]}
        toggleSection={toggleSection}
        deselectSection={deselectSection}
        title="7. UI Element Questions"
        definition="A series of key questions to evaluate whether UI elements are relevant, non-interactive, contextually grounded, and match expected components."
        items={[
          {
            check: "The UI element is relevant and helpful to the current User Prompt",
            details: "If no: Remove from conversation, tool call, and GG/expected components."
          },
          {
            check: "The UI elements do not contain any elements that are or appear that they would be interactive",
            details: "If yes: Remove interactive elements."
          },
          {
            check: "The UI element matches tool call properties and componentSchema JSON",
            details: "If no: Fix the mismatch."
          },
          {
            check: "All information in UI elements is pulled from conversation context (not hallucinated)",
            details: "If hallucinated: Replace with context-appropriate information."
          },
          {
            check: "The UI element appears in Expected Components of GG",
            details: "If no: Update GG or remove UI element."
          }
        ]}
      />
    </div>
  )
}

function ChecklistSection({ sectionId, title, definition, items, checkedItems, toggleChecked, isExpanded, toggleSection, deselectSection }) {
  const [expandedItems, setExpandedItems] = useState({})

  const toggleItem = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const handleCheckboxClick = (e, itemId) => {
    e.stopPropagation()
    toggleChecked(itemId)
  }

  const handleDeselectClick = (e) => {
    e.stopPropagation()
    deselectSection(sectionId, items.length)
  }

  return (
    <section className="checklist-section-main">
      <div className="section-header" onClick={() => toggleSection(sectionId)}>
        <h2 className="section-title">{title}</h2>
        <button 
          className="section-deselect-btn" 
          onClick={handleDeselectClick}
        >
          Deselect All
        </button>
        <span className="section-expand-icon">{isExpanded ? '−' : '+'}</span>
      </div>
      {isExpanded && (
        <>
          {definition && (
            <p className="section-definition">{definition}</p>
          )}
          <div className="checklist-items">
        {items.map((item, index) => {
          const itemId = `${sectionId}-${index}`
          const isChecked = checkedItems[itemId] || false
          return (
            <div key={index} className="checklist-item">
              <div className="checklist-item-header" onClick={() => toggleItem(index)}>
                <span 
                  className="check-icon" 
                  onClick={(e) => handleCheckboxClick(e, itemId)}
                >
                  {isChecked ? '☑' : '☐'}
                </span>
                <span className="check-text">{item.check}</span>
                <span className="expand-icon">{expandedItems[index] ? '−' : '+'}</span>
              </div>
              {expandedItems[index] && (
                <div className="checklist-item-details">
                  <p>{item.details}</p>
                </div>
              )}
            </div>
          )
        })}
          </div>
        </>
      )}
    </section>
  )
}

function TypeScriptSyntaxHighlighter({ content }) {
  if (!content) return null
  
  // Simple syntax highlighting for TypeScript - color interfaces/types differently
  const lines = content.split('\n')
  
  return (
    <>
      {lines.map((line, index) => {
        const trimmed = line.trim()
        let className = ''
        
        // Color interface names
        if (trimmed.startsWith('interface ')) {
          const interfaceName = trimmed.match(/interface\s+(\w+)/)?.[1]
          if (interfaceName) {
            const colored = line.replace(
              new RegExp(`interface\\s+${interfaceName}`, 'g'),
              `<span class="ts-interface-name">interface ${interfaceName}</span>`
            )
            return <div key={index} dangerouslySetInnerHTML={{ __html: colored }} />
          }
        }
        
        // Color type names
        if (trimmed.startsWith('type ')) {
          const typeName = trimmed.match(/type\s+(\w+)/)?.[1]
          if (typeName) {
            const colored = line.replace(
              new RegExp(`type\\s+${typeName}`, 'g'),
              `<span class="ts-type-name">type ${typeName}</span>`
            )
            return <div key={index} dangerouslySetInnerHTML={{ __html: colored }} />
          }
        }
        
        // Color strings
        const withStrings = line.replace(
          /(["'`])(?:(?=(\\?))\2.)*?\1/g,
          '<span class="ts-string">$&</span>'
        )
        
        // Color comments
        const withComments = withStrings.replace(
          /(\/\/.*$)/gm,
          '<span class="ts-comment">$1</span>'
        )
        
        return <div key={index} dangerouslySetInnerHTML={{ __html: withComments }} />
      })}
    </>
  )
}

function CollapsibleJSON({ data, level = 0 }) {
  const [collapsed, setCollapsed] = useState(false)
  const isRoot = level === 0
  
  if (data === null || data === undefined) {
    return <span className="json-null">null</span>
  }
  
  if (typeof data === 'string') {
    return <span className="json-string">"{data}"</span>
  }
  
  if (typeof data === 'number' || typeof data === 'boolean') {
    return <span className="json-number">{String(data)}</span>
  }
  
  if (Array.isArray(data)) {
    if (data.length === 0) {
      return <span className="json-bracket">[]</span>
    }
    
    return (
      <>
        {!isRoot && (
          <span 
            className="json-toggle" 
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? '▶' : '▼'}
          </span>
        )}
        {collapsed && !isRoot ? (
          <>
            <span className="json-bracket">[</span>
            <span className="json-ellipsis"> ... {data.length} items</span>
            <span className="json-bracket">]</span>
          </>
        ) : (
          <>
            <span className="json-bracket">[</span>
            <div className={`json-content ${!isRoot ? 'json-content-nested' : ''}`}>
              {data.map((item, index) => (
                <div key={index} className="json-item">
                  <CollapsibleJSON data={item} level={level + 1} />
                  {index < data.length - 1 && <span className="json-comma">,</span>}
                </div>
              ))}
            </div>
            <span className="json-bracket">]</span>
          </>
        )}
      </>
    )
  }
  
  if (typeof data === 'object') {
    const keys = Object.keys(data)
    if (keys.length === 0) {
      return <span className="json-bracket">{'{}'}</span>
    }
    
    return (
      <>
        {!isRoot && (
          <span 
            className="json-toggle" 
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? '▶' : '▼'}
          </span>
        )}
        {collapsed && !isRoot ? (
          <>
            <span className="json-bracket">{'{'}</span>
            <span className="json-ellipsis"> ... {keys.length} keys</span>
            <span className="json-bracket">{'}'}</span>
          </>
        ) : (
          <>
            {!isRoot && <div className="json-bracket-line"><span className="json-bracket">{'{'}</span></div>}
            {isRoot && <span className="json-bracket">{'{'}</span>}
            <div className={`json-content ${!isRoot ? 'json-content-nested' : ''}`}>
              {keys.map((key, index) => (
                <div key={key} className="json-item">
                  <span className="json-key">"{key}"</span>
                  <span className="json-colon">: </span>
                  <CollapsibleJSON data={data[key]} level={level + 1} />
                  {index < keys.length - 1 && <span className="json-comma">,</span>}
                </div>
              ))}
            </div>
            {!isRoot && <div className="json-bracket-line"><span className="json-bracket">{'}'}</span></div>}
            {isRoot && <span className="json-bracket">{'}'}</span>}
          </>
        )}
      </>
    )
  }
  
  return <span>{String(data)}</span>
}

function ExampleComponents() {
  const [activeFile, setActiveFile] = useState('conversation')
  const [fileContents, setFileContents] = useState({
    conversation: null,
    components: null,
    canvas: null
  })
  const [parsedJSON, setParsedJSON] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load the three files
    const baseUrl = import.meta.env.BASE_URL || '/'
    const basePath = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
    Promise.all([
      fetch(`${basePath}COMPLEX_content_calendar_for_newsletter/conversation.json`)
        .then(res => res.text()),
      fetch(`${basePath}COMPLEX_content_calendar_for_newsletter/components.ts`)
        .then(res => res.text()),
      fetch(`${basePath}COMPLEX_content_calendar_for_newsletter/canvas.html`)
        .then(res => res.text())
    ]).then(([conversation, components, canvas]) => {
      setFileContents({
        conversation,
        components,
        canvas
      })
      // Parse JSON for collapsible view
      try {
        setParsedJSON(JSON.parse(conversation))
      } catch {
        setParsedJSON(null)
      }
      setLoading(false)
    }).catch(err => {
      console.error('Error loading files:', err)
      setLoading(false)
    })
  }, [])

  const formatContent = (content, type) => {
    if (!content) return ''
    if (type === 'json') {
      try {
        return JSON.stringify(JSON.parse(content), null, 2)
      } catch {
        return content
      }
    }
    return content
  }

  const getLanguage = (file) => {
    if (file === 'conversation') return 'json'
    if (file === 'components') return 'typescript'
    return 'html'
  }

  return (
    <div className="example-page">
      <section className="content-section">
        <h2>Example Datapoint</h2>
        
        <div className="datapoint-tabs">
          <button
            className={`datapoint-tab ${activeFile === 'conversation' ? 'active' : ''}`}
            onClick={() => setActiveFile('conversation')}
          >
            conversation.json
          </button>
          <button
            className={`datapoint-tab ${activeFile === 'components' ? 'active' : ''}`}
            onClick={() => setActiveFile('components')}
          >
            components.ts
          </button>
          <button
            className={`datapoint-tab ${activeFile === 'canvas' ? 'active' : ''}`}
            onClick={() => setActiveFile('canvas')}
          >
            canvas.html
          </button>
        </div>

        {loading ? (
          <div className="file-loading">Loading files...</div>
        ) : activeFile === 'canvas' ? (
          <div className="canvas-viewer">
            <div className="file-header">
              <h3>canvas.html</h3>
            </div>
            <iframe
              src="/COMPLEX_content_calendar_for_newsletter/canvas.html"
              className="canvas-iframe"
              title="Canvas HTML Preview"
            />
          </div>
        ) : (
          <div className="file-viewer">
            <div className="file-header">
              <h3>{activeFile === 'conversation' ? 'conversation.json' : 'components.ts'}</h3>
            </div>
            {activeFile === 'conversation' && parsedJSON ? (
              <div className="file-content json-viewer">
                <CollapsibleJSON data={parsedJSON} />
              </div>
            ) : activeFile === 'components' ? (
              <pre className="file-content">
                <code className="language-typescript">
                  <TypeScriptSyntaxHighlighter content={fileContents.components} />
                </code>
              </pre>
            ) : (
              <pre className="file-content">
                <code className={`language-${getLanguage(activeFile)}`}>
                  {formatContent(fileContents[activeFile], getLanguage(activeFile))}
                </code>
              </pre>
            )}
          </div>
        )}
      </section>
    </div>
  )
}

export default App
