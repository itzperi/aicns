import React from 'react';
import { useContent } from '../contexts/ContentContext';
import { useAdmin } from '../contexts/AdminContext';
import { EditableText, EditableImage } from './ui/Editable';
import { ExternalLink, CreditCard, Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

export const RegistrationFees: React.FC = () => {
    const { content, updateContent } = useContent();
    const { isAdmin } = useAdmin();

    const updateFees = (index: number, field: string, value: any) => {
        const newFees = [...content.fees.items];
        if (newFees[index]) {
            (newFees[index] as any)[field] = value;
            updateContent('fees', { ...content.fees, items: newFees });
        }
    };

    const updatePrice = (itemIdx: number, priceIdx: number, value: string) => {
        const newItems = [...content.fees.items];
        const newPrices = [...newItems[itemIdx].prices];
        newPrices[priceIdx] = value;
        newItems[itemIdx].prices = newPrices;
        updateContent('fees', { ...content.fees, items: newItems });
    };

    const updateHeader = (index: number, value: string) => {
        const newHeaders = [...content.fees.columnHeaders];
        newHeaders[index] = value;
        updateContent('fees', { ...content.fees, columnHeaders: newHeaders });
    };

    const addColumn = () => {
        const newHeaders = [...content.fees.columnHeaders, "New Column"];
        const newItems = content.fees.items.map(item => ({
            ...item,
            prices: [...item.prices, "0"]
        }));
        updateContent('fees', { ...content.fees, columnHeaders: newHeaders, items: newItems });
    };

    const removeColumn = (colIdx: number) => {
        if (colIdx === 0) return; // Cannot remove Category column
        const newHeaders = content.fees.columnHeaders.filter((_, i) => i !== colIdx);
        const priceIdx = colIdx - 1;
        const newItems = content.fees.items.map(item => ({
            ...item,
            prices: item.prices.filter((_, i) => i !== priceIdx)
        }));
        updateContent('fees', { ...content.fees, columnHeaders: newHeaders, items: newItems });
    };

    const addFeeRow = () => {
        const newFee = {
            category: "New Category",
            prices: new Array(content.fees.columnHeaders.length - 1).fill("0")
        };
        updateContent('fees', { ...content.fees, items: [...content.fees.items, newFee] });
    };

    const removeFeeRow = (index: number) => {
        const newFees = content.fees.items.filter((_, i) => i !== index);
        updateContent('fees', { ...content.fees, items: newFees });
    };

    const updatePayment = (key: string, val: string) => {
        updateContent('fees', { ...content.fees, [key]: val });
    };

    const addInclusion = () => {
        updateContent('fees', { ...content.fees, inclusions: [...content.fees.inclusions, "New point"] });
    };

    const removeInclusion = (index: number) => {
        const newInclusions = content.fees.inclusions.filter((_, i) => i !== index);
        updateContent('fees', { ...content.fees, inclusions: newInclusions });
    };

    const updateInclusion = (index: number, val: string) => {
        const newInclusions = [...content.fees.inclusions];
        newInclusions[index] = val;
        updateContent('fees', { ...content.fees, inclusions: newInclusions });
    };

    const addPoint = () => {
        updateContent('fees', { ...content.fees, importantPoints: [...content.fees.importantPoints, "New point"] });
    };

    const removePoint = (index: number) => {
        const newPoints = content.fees.importantPoints.filter((_, i) => i !== index);
        updateContent('fees', { ...content.fees, importantPoints: newPoints });
    };

    const updatePoint = (index: number, val: string) => {
        const newPoints = [...content.fees.importantPoints];
        newPoints[index] = val;
        updateContent('fees', { ...content.fees, importantPoints: newPoints });
    };

    return (
        <div className="mb-12 relative">
            <div className="flex flex-col items-center mb-10 text-center">
                <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-2">
                    <EditableText value={content.fees.subtitle} onChange={(v) => updateContent('fees', { ...content.fees, subtitle: v })} />
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    <EditableText value={content.fees.title} onChange={(v) => updateContent('fees', { ...content.fees, title: v })} />
                </h2>
                <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            </div>

            <div className="mb-4 flex gap-2 justify-end">
                {isAdmin && (
                    <>
                        <button onClick={addColumn} className="bg-indigo-600 text-white px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 shadow hover:bg-indigo-700 transition-colors">
                            <Plus size={14} /> Add Column
                        </button>
                        <button onClick={addFeeRow} className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 shadow hover:bg-blue-700 transition-colors">
                            <Plus size={14} /> Add Row
                        </button>
                    </>
                )}
            </div>

            <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 bg-white">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-blue-900 text-white text-sm uppercase tracking-wider">
                            {content.fees.columnHeaders.map((header, colIdx) => (
                                <th key={colIdx} className="p-5 font-bold border-b border-blue-800 relative group">
                                    <EditableText
                                        value={header}
                                        onChange={(v) => updateHeader(colIdx, v)}
                                    />
                                    {isAdmin && colIdx > 0 && (
                                        <button
                                            onClick={() => removeColumn(colIdx)}
                                            className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-all"
                                        >
                                            <Trash2 size={10} />
                                        </button>
                                    )}
                                </th>
                            ))}
                            {isAdmin && <th className="p-5 font-bold border-b border-blue-800 text-center w-10">Actions</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {content.fees.items.map((fee, rowIdx) => (
                            <tr
                                key={rowIdx}
                                className={`
                                    transition-colors hover:bg-blue-50/50
                                    ${rowIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                                `}
                            >
                                <td className="p-5 font-semibold text-slate-800">
                                    <EditableText
                                        value={fee.category}
                                        onChange={(v) => updateFees(rowIdx, 'category', v)}
                                    />
                                </td>
                                {fee.prices.map((price, priceIdx) => (
                                    <td key={priceIdx} className="p-5 font-bold text-blue-600 text-center">
                                        <EditableText
                                            value={price}
                                            onChange={(v) => updatePrice(rowIdx, priceIdx, v)}
                                        />
                                    </td>
                                ))}
                                {isAdmin && (
                                    <td className="p-5 text-center">
                                        <button onClick={() => removeFeeRow(rowIdx)} className="text-red-500 hover:text-red-700 transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Registration Inclusions & Important Points Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                {/* Registration Inclusions Section */}
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm h-full">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                            <CheckCircle2 className="text-blue-600" />
                            <EditableText
                                value={content.fees.inclusionsTitle}
                                onChange={(v) => updateContent('fees', { ...content.fees, inclusionsTitle: v })}
                            />
                        </h3>
                        {isAdmin && (
                            <button onClick={addInclusion} className="text-blue-600 hover:text-blue-700 font-bold text-sm flex items-center gap-1">
                                <Plus size={16} /> Add
                            </button>
                        )}
                    </div>
                    <div className="space-y-4">
                        {content.fees.inclusions.map((point, idx) => (
                            <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50/50 hover:bg-white hover:shadow-md transition-all group">
                                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                                    {idx + 1}
                                </div>
                                <div className="flex-grow">
                                    <EditableText
                                        value={point}
                                        onChange={(v) => updateInclusion(idx, v)}
                                        className="text-gray-700"
                                    />
                                </div>
                                {isAdmin && (
                                    <button
                                        onClick={() => removeInclusion(idx)}
                                        className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Important Points Section */}
                <div className="bg-orange-50/50 rounded-2xl p-8 border border-orange-100 shadow-sm h-full">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold text-orange-900 flex items-center gap-3">
                            <AlertCircle className="text-orange-600" />
                            <EditableText
                                value={content.fees.importantPointsTitle}
                                onChange={(v) => updateContent('fees', { ...content.fees, importantPointsTitle: v })}
                            />
                        </h3>
                        {isAdmin && (
                            <button onClick={addPoint} className="text-orange-600 hover:text-orange-700 font-bold text-sm flex items-center gap-1">
                                <Plus size={16} /> Add
                            </button>
                        )}
                    </div>
                    <div className="space-y-4">
                        {content.fees.importantPoints.map((point, idx) => (
                            <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white hover:shadow-md transition-all group">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2.5 flex-shrink-0"></div>
                                <div className="flex-grow">
                                    <EditableText
                                        value={point}
                                        onChange={(v) => updatePoint(idx, v)}
                                        className="text-gray-700"
                                    />
                                </div>
                                {isAdmin && (
                                    <button
                                        onClick={() => removePoint(idx)}
                                        className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Payment Section: QR Code and Other Methods */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                {/* QR Code Section */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col items-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Scan to Pay</h3>
                    <div className="w-48 h-48 bg-gray-100 rounded-lg overflow-hidden relative group">
                        {content.fees.qrCode ? (
                            <EditableImage
                                src={content.fees.qrCode}
                                alt="Payment QR Code"
                                onChange={(v) => updatePayment('qrCode', v)}
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                                <CreditCard size={32} className="mb-2" />
                                <span className="text-xs text-center px-4">Admin: Click to upload QR Code</span>
                                <div className="absolute inset-0">
                                    <EditableImage
                                        src=""
                                        alt="Upload QR"
                                        onChange={(v) => updatePayment('qrCode', v)}
                                        className="w-full h-full opacity-0 cursor-pointer"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <p className="border-b-2 text-sm text-gray-500 mt-4 text-center">
                        UPI / Bank Transfer QR Code
                    </p>
                </div>

                {/* Additional Payment Methods */}
                <div className="bg-blue-50/50 p-8 rounded-xl border border-blue-100 h-full flex flex-col justify-center items-center text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Other Payment Options</h3>
                    <p className="text-gray-600 mb-6 max-w-sm">
                        Prefer to pay via Credit/Debit card or other gateways? Click below to proceed.
                    </p>
                    <div className="relative group">
                        <a
                            href={content.fees.paymentLink || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                            onClick={(e) => {
                                if (!content.fees.paymentLink) e.preventDefault();
                            }}
                        >
                            <ExternalLink size={18} />
                            Pay via Other Methods
                        </a>
                        <div className="mt-4">
                            <div className="flex items-center justify-center gap-2 mt-2">
                                <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">Target Link:</span>
                                <EditableText
                                    value={content.fees.paymentLink || ""}
                                    onChange={(v) => updatePayment('paymentLink', v)}
                                    className="text-xs bg-white border-blue-200 min-w-[200px]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
