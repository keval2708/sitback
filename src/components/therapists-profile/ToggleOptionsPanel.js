"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ToggleOptionsPanel({ sections, defaults, variant = "notification" }) {
  const { t } = useTranslation();
  const [values, setValues] = useState(defaults);

  const toggle = (key) => {
    setValues((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="profile-subtab-panel">
      {sections.map((section) => (
        <div key={section.titleKey} className="toggle-options-section">
          <p className="panel-section-title">{t(section.titleKey)}</p>

          {section.items.map((item) => (
            <div
              key={item.key}
              className={`toggle-options-item ${variant === "permission" ? "permission-item" : "notification-item"}`}
            >
              <div className="toggle-options-content">
                <span className="item-label">{t(item.labelKey)}</span>
                {item.descriptionKey && (
                  <p className="item-description">{t(item.descriptionKey)}</p>
                )}
                {item.helperTextKey && (
                  <p className="item-helper-text">{t(item.helperTextKey)}</p>
                )}
              </div>

              <label className={`toggle-switch ${item.disabled ? "is-disabled" : ""}`}>
                <input
                  type="checkbox"
                  checked={values[item.key]}
                  disabled={item.disabled}
                  onChange={() => toggle(item.key)}
                />
                <span className="slider" />
              </label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
