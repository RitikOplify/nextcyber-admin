"use client";
import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";

const TechnicalForm = ({ form }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    clearErrors,
    trigger,
  } = form;

  const [dropdownStates, setDropdownStates] = useState({});
  const watchedValues = watch();

  // State for selected values
  const [selectedCertificates, setSelectedCertificates] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  // Register fields for validation
  useEffect(() => {
    register("contractType");
    register("remotePolicy");
    register("certificates");
    register("skills");
  }, [register]);

  // Update form values when state changes
  useEffect(() => {
    setValue("certificates", selectedCertificates);
  }, [selectedCertificates, setValue]);

  useEffect(() => {
    setValue("skills", selectedSkills);
  }, [selectedSkills, setValue]);

  // Options for contract types (single select)
  const contractTypes = [
    "Regular Employment",
    "Fixed-term",
    "Freelance",
    "Internship",
  ];

  // Options for remote policy (single select)
  const remotePolicies = ["On-site", "Hybrid", "Remote"];

  // Options for certificates (multi-select)
  const certificateOptions = [
    "(ISC)² — Certified in Cybersecurity (CC)",
    "CompTIA — Security+ (SY0-)",
    "CompTIA — CySA+ (Cybersecurity Analyst)",
    "CompTIA — PenTest+",
    "CompTIA — CASP+ (Advanced Security Practitioner)",
    "CompTIA — Network+ (often required for SOC/blue team)",
    "ISACA — Cybersecurity Fundamentals Certificate",
    "(ISC)² — CISSP (Certified Information Systems Security Professional)",
    "(ISC)² — CSSLP (Secure Software Lifecycle Professional)",
    "ISACA — CISA (Information Systems Auditor)",
    "ISACA — CISM (Information Security Manager)",
    "ISACA — CRISC (Risk and Information Systems Control)",
    "ISACA — CGEIT (Governance of Enterprise IT)",
    "ISACA — CDPSE (Data Privacy Solutions Engineer)",
    "ISO/IEC — 27001 Lead Implementer",
    "ISO/IEC — 27001 Lead Auditor",
    "ISO/IEC — 27701 Lead Implementer (Privacy)",
    "ISO/IEC — 27701 Lead Auditor (Privacy)",
    "ISO 22301 — Business Continuity Lead Implementer",
    "ISO 22301 — Business Continuity Lead Auditor",
    "PCI SSC — PCIP (PCI Professional)",
    "PCI SSC — ISA (Internal Security Assessor)",
    "IAPP — CIPP/E",
    "IAPP — CIPP/US",
    "IAPP — CIPP/A",
    "IAPP — CIPP/C",
    "IAPP — CIPM",
    "IAPP — CIPT",
    "IAPP — AIGP (AI Governance Professional)",
    "The Open Group — Open FAIR Foundation",
    "The Open Group — Open FAIR Risk Analyst",
    "SABSA — SCF (Foundation) / SCP (Practitioner) / SCL (Advanced)",
    "OffSec — OSCP",
    "OffSec — OSWE",
    "OffSec — OSEP",
    "OffSec — OSED",
    "OffSec — OSEE",
    "OffSec — OSWP",
    "GIAC — GPEN",
    "GIAC — GWAPT",
    "GIAC — GWEB",
    "GIAC — GXPN",
    "GIAC — GREM",
    "EC-Council — CEH (Certified Ethical Hacker)",
    "EC-Council — CEH Practical / CEH Master",
    "EC-Council — CPENT (Practical Penetration Tester)",
    "EC-Council — LPT (Master)",
    "CREST — CPSA",
    "CREST — CRT (Registered Tester)",
    "CREST — CCT (App) / CCT (Infra)",
    "CREST — CCIM (Incident Manager) / CCTIM (Threat Intel Manager)",
    "eLearnSecurity/INE — eJPT",
    "eLearnSecurity/INE — eCPPT",
    "eLearnSecurity/INE — eWPT / eWPTX",
    "eLearnSecurity/INE — eCPTX",
    "eLearnSecurity/INE — eCRE (Reverse Engineering)",
    "eLearnSecurity/INE — eCIR (Incident Responder)",
    "TCM Security — PJPT",
    "TCM Security — PNPT",
    "TCM Security — PMAT",
    "Hack The Box — CPTS (Penetration Testing Specialist)",
    "Hack The Box — CBBH (Bug Bounty Hunter)",
    "GIAC — GSEC",
    "GIAC — GCIH",
    "GIAC — GCIA",
    "GIAC — GMON",
    "GIAC — GCDA (Certified Detection & Analysis)",
    "GIAC — GCFA (Forensic Analyst)",
    "GIAC — GCFE (Forensic Examiner)",
    "GIAC — GNFA (Network Forensic Analyst)",
    "GIAC — GCTI (Cyber Threat Intelligence)",
    "EC-Council — CSA (Certified SOC Analyst)",
    "EC-Council — ECIH (Incident Handler)",
    "EC-Council — CHFI (Computer Hacking Forensic Investigator)",
    "MITRE — ATT&CK Defender (MAD) — Fundamentals / CTI / SOC Assessments / Adversary Emulation",
    "Security Blue Team — BTL1 (Blue Team Level 1)",
    "Security Blue Team — BTL2 (Blue Team Level 2)",
    "OffSec — OSDA (Offensive Security Defense Analyst)",
    "(ISC)² — CCSP",
    "CSA — CCSK (Certificate of Cloud Security Knowledge)",
    "AWS — Certified Security – Specialty",
    "Microsoft — AZ-500 (Azure Security Engineer)",
    "Microsoft — SC-200 (Security Operations Analyst)",
    "Microsoft — SC-300 (Identity & Access Administrator)",
    "Microsoft — SC-100 (Cybersecurity Architect)",
    "Google Cloud — Professional Cloud Security Engineer",
    "GIAC — GCPN (Cloud Penetration Tester)",
    "GIAC — GCSA (Cloud Security Automation)",
    "Palo Alto Networks — PCCSE (Prisma Cloud Security Engineer)",
    "Cisco — CyberOps Associate",
    "Cisco — CyberOps Professional",
    "Cisco — CCNP Security",
    "Cisco — CCIE Security",
    "Palo Alto Networks — PCCET",
    "Palo Alto Networks — PCNSA",
    "Palo Alto Networks — PCNSE",
    "Check Point — CCSA",
    "Check Point — CCSE",
    "Check Point — CCSM",
    "Juniper — JNCIS-SEC / JNCIP-SEC",
    "F5 — BIG-IP Administrator (F5-CA)",
    "F5 — CTS: ASM (WAF) / APM (Access)",
    "Okta — Certified Professional",
    "Okta — Certified Administrator",
    "Okta — Certified Consultant",
    "GIAC — GSSP-Java / GSSP-.NET (Secure Software Programmer)",
    "Splunk — Core Certified User",
    "Splunk — Core Certified Power User",
    "Splunk — Enterprise Certified Admin",
    "Splunk — Enterprise Security (ES) Certified Admin",
    "Splunk — SOAR Certified Automation Developer",
    "Elastic — Certified Analyst",
    "Elastic — Certified Engineer",
    "IBM — QRadar SIEM Certification (Analyst/Admin)",
    "GIAC — GICSP (Global Industrial Cyber Security Professional)",
    "GIAC — GRID (Response & Industrial Defense)",
    "ISA/IEC 62443 — Cybersecurity Fundamentals Specialist",
    "ISA/IEC 62443 — Risk Assessment Specialist",
    "ISA/IEC 62443 — Design Specialist",
    "ISA/IEC 62443 — Maintenance Specialist",
    "IACIS — CFCE (Certified Forensic Computer Examiner)",
    "OpenText — EnCE (EnCase Certified Examiner)",
    "Cellebrite — CCO (Certified Operator)",
    "Cellebrite — CCPA (Physical Analyst)",
    "Cellebrite — CCME (Mobile Examiner)",
    "Magnet Forensics — MCFE (Magnet Certified Forensics Examiner)",
    "X-Ways — X-PERT (Forensics Practitioner)",
  ];

  // Options for skills (multi-select)
  const skillOptions = [
    "Analytical Thinking",
    "Advanced Red Team Operations",
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "Machine Learning",
    "Data Analysis",
    "Cloud Computing",
    "DevOps",
    "Cybersecurity",
    "Project Management",
    "Agile Development",
    "Database Management",
  ];

  // Toggle dropdown
  const toggleDropdown = (name) => {
    setDropdownStates((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // Handle single select
  const handleSingleSelect = (name, value) => {
    setValue(name, value);
    setDropdownStates((prev) => ({ ...prev, [name]: false }));
    clearErrors(name);
    trigger(name);
  };

  // Handle multi-select for certificates
  const handleCertificateSelect = (certificate) => {
    if (!selectedCertificates.includes(certificate)) {
      const newCertificates = [...selectedCertificates, certificate];
      setSelectedCertificates(newCertificates);
      clearErrors("certificates");
    }
    setDropdownStates((prev) => ({ ...prev, certificates: false }));
  };

  // Handle multi-select for skills
  const handleSkillSelect = (skill) => {
    if (!selectedSkills.includes(skill)) {
      const newSkills = [...selectedSkills, skill];
      setSelectedSkills(newSkills);
      clearErrors("skills");
    }
    setDropdownStates((prev) => ({ ...prev, skills: false }));
  };

  // Remove selected certificate
  const removeCertificate = (certificate) => {
    const newCertificates = selectedCertificates.filter(
      (cert) => cert !== certificate
    );
    setSelectedCertificates(newCertificates);
  };

  // Remove selected skill
  const removeSkill = (skill) => {
    const newSkills = selectedSkills.filter((s) => s !== skill);
    setSelectedSkills(newSkills);
  };

  // Radio button component
  const RadioButton = ({ name, value, label, isSelected, onChange }) => (
    <label className="flex items-center cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={isSelected}
        onChange={onChange}
        className="sr-only"
        {...register(name)}
      />
      <div
        className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
          isSelected ? "border-blue-500 bg-blue-500" : "border-gray-300"
        }`}
      >
        {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
      </div>
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );

  // Custom Select Component
  const CustomSelect = ({
    name,
    options,
    placeholder,
    error,
    isMulti = false,
    onSelect,
  }) => {
    const isOpen = dropdownStates[name];
    const selectedValue = watchedValues[name];

    return (
      <div className="relative">
        <div
          onClick={() => toggleDropdown(name)}
          className={`w-full text-[#6F6F6F] cursor-pointer text-[14px] font-normal p-[14px_16px] border border-[#ECECEC] ${
            isOpen ? "rounded-t-[8px] border-b-0" : "rounded-[8px]"
          } outline-none flex justify-between items-center bg-white`}
        >
          <span className={selectedValue ? "text-[#333]" : "text-[#999]"}>
            {selectedValue || placeholder}
          </span>
          <IoIosArrowDown
            className={`text-2xl text-[#6F6F6F] transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border border-[#ECECEC] shadow-lg z-10 max-h-[200px] overflow-y-auto">
            <div className="bg-[#4472C4] text-white px-4 flex items-center h-[40px] text-[14px] font-medium">
              {placeholder}
            </div>
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() =>
                  onSelect ? onSelect(option) : handleSingleSelect(name, option)
                }
                className="px-4 flex items-center h-[40px] text-[14px] text-[#333] hover:bg-[#f5f5f5] cursor-pointer border-b border-[#f0f0f0] last:border-b-0"
              >
                {option}
              </div>
            ))}
          </div>
        )}

        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      </div>
    );
  };

  // Form submission
  const onSubmit = (data) => {
    console.log("Technical Data:", data);
    console.log("Selected Certificates:", selectedCertificates);
    console.log("Selected Skills:", selectedSkills);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Contract Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Contract Type
        </label>
        <div className="flex flex-wrap gap-6">
          {contractTypes.map((type) => (
            <RadioButton
              key={type}
              name="contractType"
              value={type}
              label={type}
              isSelected={watchedValues.contractType === type}
              onChange={(e) => {
                setValue("contractType", e.target.value);
                clearErrors("contractType");
              }}
            />
          ))}
        </div>
      </div>

      {/* Remote Policy */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Remote Policy
        </label>
        <div className="flex flex-wrap gap-6">
          {remotePolicies.map((policy) => (
            <RadioButton
              key={policy}
              name="remotePolicy"
              value={policy}
              label={policy}
              isSelected={watchedValues.remotePolicy === policy}
              onChange={(e) => {
                setValue("remotePolicy", e.target.value);
                clearErrors("remotePolicy");
              }}
            />
          ))}
        </div>
      </div>

      {/* Certificates */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Certificates
        </label>
        <div className="space-y-4">
          {/* Pre-selected certificates display */}
          <div className="flex flex-wrap gap-2">
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
              CCNA
              <button
                type="button"
                onClick={() => removeCertificate("CCNA")}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                <IoCloseCircle size={14} />
              </button>
            </div>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
              AWS Certified Cloud Practitioner
              <button
                type="button"
                onClick={() =>
                  removeCertificate("AWS Certified Cloud Practitioner")
                }
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                <IoCloseCircle size={14} />
              </button>
            </div>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
              AWS Certified SysOps Administrator - Associate
              <button
                type="button"
                onClick={() =>
                  removeCertificate(
                    "AWS Certified SysOps Administrator - Associate"
                  )
                }
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                <IoCloseCircle size={14} />
              </button>
            </div>
          </div>

          {/* Custom select for additional certificates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomSelect
              name="certificates"
              options={certificateOptions}
              placeholder="Select certificates"
              error={errors.certificates}
              isMulti={true}
              onSelect={handleCertificateSelect}
            />
          </div>

          {/* Display selected additional certificates */}
          {selectedCertificates.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedCertificates.map((certificate, index) => (
                <div
                  key={index}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {certificate}
                  <button
                    type="button"
                    onClick={() => removeCertificate(certificate)}
                    className="ml-2 text-green-600 hover:text-green-800"
                  >
                    <IoCloseCircle size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Skills */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Skills
        </label>
        <div className="space-y-4">
          {/* Pre-selected skills display */}
          <div className="flex flex-wrap gap-2">
            <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center">
              Analytical Thinking
              <button
                type="button"
                onClick={() => removeSkill("Analytical Thinking")}
                className="ml-2 text-purple-600 hover:text-purple-800"
              >
                <IoCloseCircle size={14} />
              </button>
            </div>
            <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center">
              Advanced Red Team Operations
              <button
                type="button"
                onClick={() => removeSkill("Advanced Red Team Operations")}
                className="ml-2 text-purple-600 hover:text-purple-800"
              >
                <IoCloseCircle size={14} />
              </button>
            </div>
          </div>

          {/* Custom select for additional skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomSelect
              name="skills"
              options={skillOptions}
              placeholder="Select skills"
              error={errors.skills}
              isMulti={true}
              onSelect={handleSkillSelect}
            />
          </div>

          {/* Display selected additional skills */}
          {selectedSkills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedSkills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-orange-600 hover:text-orange-800"
                  >
                    <IoCloseCircle size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default TechnicalForm;
