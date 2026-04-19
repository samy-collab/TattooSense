import type { DraftAnswers, QuizQuestion as QuizQuestionType } from "../../types/quiz";

interface QuizQuestionProps {
  question: QuizQuestionType;
  value: DraftAnswers[string];
  error?: string;
  onChange: (value: DraftAnswers[string]) => void;
}

export function QuizQuestion({ question, value, error, onChange }: QuizQuestionProps) {
  const describedBy = error ? `${question.key}-error` : question.description ? `${question.key}-description` : undefined;

  return (
    <fieldset className="question" aria-describedby={describedBy}>
      <legend>
        <span>{question.title}</span>
        {question.isRequired ? <strong>Obrigatoria</strong> : null}
      </legend>
      {question.description ? <p id={`${question.key}-description`}>{question.description}</p> : null}

      {question.inputType === "single_choice" ? (
        <div className="option-grid">
          {question.options.map((option) => (
            <label className="option" key={option.key}>
              <input
                type="radio"
                name={question.key}
                value={option.key}
                checked={value.selectedOptionKeys.includes(option.key)}
                onChange={() => onChange({ ...value, selectedOptionKeys: [option.key] })}
              />
              <span>{option.label}</span>
              {option.description ? <small>{option.description}</small> : null}
            </label>
          ))}
        </div>
      ) : null}

      {question.inputType === "multi_choice" ? (
        <div className="option-grid">
          {question.options.map((option) => {
            const checked = value.selectedOptionKeys.includes(option.key);
            return (
              <label className="option" key={option.key}>
                <input
                  type="checkbox"
                  value={option.key}
                  checked={checked}
                  onChange={() =>
                    onChange({
                      ...value,
                      selectedOptionKeys: checked
                        ? value.selectedOptionKeys.filter((item) => item !== option.key)
                        : [...value.selectedOptionKeys, option.key]
                    })
                  }
                />
                <span>{option.label}</span>
                {option.description ? <small>{option.description}</small> : null}
              </label>
            );
          })}
        </div>
      ) : null}

      {question.inputType === "scale" ? (
        <div className="scale">
          <span>Discreto</span>
          {[1, 2, 3, 4, 5].map((number) => (
            <label key={number}>
              <input
                type="radio"
                name={question.key}
                value={number}
                checked={value.scaleValue === number}
                onChange={() => onChange({ ...value, scaleValue: number })}
              />
              <span>{number}</span>
            </label>
          ))}
          <span>Chamativo</span>
        </div>
      ) : null}

      {question.inputType === "free_text" ? (
        <textarea
          value={value.textValue}
          onChange={(event) => onChange({ ...value, textValue: event.target.value })}
          rows={4}
        />
      ) : null}

      {error ? (
        <p className="field-error" id={`${question.key}-error`}>
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
